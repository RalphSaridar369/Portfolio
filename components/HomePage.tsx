'use client';

import { useCallback, useEffect, useRef, useState, type FormEvent, type MouseEvent } from 'react';
import { site, type Project, type Service } from '@/lib/site-data';
import { EMPTY_FORM, validate, type Errors, type Form } from '@/lib/contact';
import { Button, ExperienceItem, Footer, Icon, NavBar, OptionChips, ProcessStep, ProjectCard, SectionHeading, ServiceCard, StatusBadge, Tag, TechChip, TextField, type Status } from './ds';

const SECTION_IDS = ['services', 'work', 'process', 'experience', 'faq', 'contact'];
const HERO_TAGS = ['react', 'next.js', 'react-native', 'node.js', 'typescript'];
const FILTERS = ['All', 'Personal', 'Client', 'Mobile app'];
const FILTER_KIND: Record<string, string | undefined> = { Personal: 'personal', Client: 'client', 'Mobile app': 'mobile' };
const STATUS_LABEL: Record<Status, string> = { available: 'Available for freelance', busy: 'Limited availability · 1 slot left', closed: 'Fully booked · join the waitlist' };

export default function HomePage({ availability = 'available' }: { availability?: Status }) {
  const barRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [modal, setModal] = useState<Project | null>(null);
  const [service, setService] = useState<Service | null>(null);
  const [filter, setFilter] = useState('All');
  const [faqOpen, setFaqOpen] = useState(0);
  const [form, setForm] = useState<Form>(EMPTY_FORM);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');

  const go = useCallback((id: string, e?: MouseEvent<HTMLElement>) => {
    e?.preventDefault();
    setMenu(false);
    const mobile = window.innerWidth < 768;
    const el = document.getElementById(id);
    const top = id === 'top' ? 0 : (el?.getBoundingClientRect().top || 0) + window.scrollY - (mobile ? 64 : 76) + 1;
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  const closeModal = useCallback(() => {
    document.body.style.overflow = '';
    setModal(null);
    setService(null);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (barRef.current) barRef.current.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
      let a = '';
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) a = id;
      }
      setActive(a);
      setScrolled(y > 8);
    };
    const onResize = () => {
      if (window.innerWidth >= 768) setMenu(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', onKey);
    onScroll();
    const hash = location.hash.slice(1);
    const t = hash && document.getElementById(hash) ? setTimeout(() => go(hash), 300) : undefined;
    return () => {
      clearTimeout(t);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [go, closeModal]);

  const openService = (sv: Service) => {
    document.body.style.overflow = 'hidden';
    setService(sv);
  };
  const openModal = (p: Project) => {
    document.body.style.overflow = 'hidden';
    setModal(p);
  };
  const hireFromModal = () => {
    closeModal();
    setTimeout(() => go('contact'), 50);
  };
  const goContact = (e: MouseEvent<HTMLElement>) => go('contact', e);
  const goWork = (e: MouseEvent<HTMLElement>) => go('work', e);

  const setField = (k: keyof Form) => (v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((er) => {
      const next = { ...er };
      delete next[k];
      return next;
    });
  };

  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    setSendError('');
    if (Object.keys(errs).length) return;
    setSending(true);
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json().catch(() => ({}));
      if (res.ok) setSent(true);
      else if (data.errors) setErrors(data.errors);
      else setSendError('Something went wrong and your message wasn’t sent. Try again, or email me at ' + site.contact.email + '.');
    } catch {
      setSendError('Couldn’t reach the server. Check your connection and try again, or email me at ' + site.contact.email + '.');
    } finally {
      setSending(false);
    }
  };

  const resetForm = () => {
    setSent(false);
    setForm(EMPTY_FORM);
    setErrors({});
    setSendError('');
  };

  const kind = FILTER_KIND[filter];
  const projects = kind ? site.projects.filter((p) => p.kinds.includes(kind)) : site.projects;
  const filterCount = projects.length + (projects.length === 1 ? ' project' : ' projects');

  const lit = scrolled || menu;
  const c = site.contact;
  const contactRows = [
    { icon: 'mail', label: 'Email', value: c.email, href: 'mailto:' + c.email, target: '_self' },
    { icon: 'linkedin', label: 'LinkedIn', value: c.linkedinLabel, href: c.linkedin, target: '_blank' },
    { icon: 'github', label: 'GitHub', value: c.githubLabel, href: c.github, target: '_blank' },
  ];
  const socials = [
    { icon: 'github', href: c.github, label: 'GitHub' },
    { icon: 'linkedin', href: c.linkedin, label: 'LinkedIn' },
  ];

  return (
    <div id="top" style={{ background: 'var(--surface-page)', color: 'var(--text-body)', font: '400 18px/1.65 var(--font-body)', minHeight: '100vh' }}>
      <div ref={barRef} style={{ position: 'fixed', top: 0, left: 0, height: 'var(--progress-height)', width: 0, background: 'var(--accent)', zIndex: 80 }} />

      {/* Desktop nav */}
      <div
        className="nav-desktop"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: scrolled ? 'var(--white)' : 'transparent',
          ['--text-body' as string]: scrolled ? 'var(--navy-800)' : 'var(--navy-100)',
          borderBottom: '1px solid ' + (scrolled ? 'var(--paper-300)' : 'transparent'),
          boxShadow: scrolled ? 'var(--shadow-light-card)' : 'none',
          transition: 'background var(--dur-slow) var(--ease-out),box-shadow var(--dur-slow) var(--ease-out)',
        }}
      >
        <NavBar logoSrc="/assets/logo3.png" links={site.links} active={active} onNavigate={go} onCta={goContact} />
      </div>

      {/* Mobile nav */}
      <header
        className="nav-mobile"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: lit ? 'var(--white)' : 'var(--surface-page)',
          ['--text-strong' as string]: lit ? 'var(--navy-900)' : 'var(--white)',
          ['--text-body' as string]: scrolled ? 'var(--navy-800)' : 'var(--navy-100)',
          borderBottom: '1px solid ' + (lit ? 'var(--paper-300)' : 'var(--border-subtle)'),
          transition: 'background var(--dur-slow) var(--ease-out)',
        }}
      >
        <div style={{ height: 64, padding: '0 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <a href="#top" onClick={(e) => go('top', e)} style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/assets/logo3.png" alt="Ralph Saridar" style={{ height: 22 }} />
          </a>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
            <Button size="sm" href="#contact" onClick={goContact}>
              Hire me
            </Button>
            <button onClick={() => setMenu((m) => !m)} aria-label="Menu" style={{ width: 44, height: 44, borderRadius: 'var(--radius-pill)', border: '1px solid var(--border-default)', background: 'transparent', color: 'var(--text-strong)', display: 'grid', placeItems: 'center', cursor: 'pointer' }}>
              <Icon name={menu ? 'x' : 'menu'} size={20} />
            </button>
          </div>
        </div>
        {menu && (
          <nav style={{ display: 'grid', padding: '8px 20px 20px', borderTop: '1px solid var(--border-subtle)' }}>
            {site.links.map((l, i) => (
              <a key={l.id} href={'#' + l.id} onClick={(e) => go(l.id, e)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: 52, borderBottom: '1px solid var(--border-subtle)', font: '500 17px/1 var(--font-body)', color: active === l.id ? 'var(--accent)' : 'var(--text-strong)' }}>
                {l.label}
                <span style={{ font: '500 12px/1 var(--font-mono)', color: 'var(--text-subtle)' }}>{'0' + (i + 1)}</span>
              </a>
            ))}
          </nav>
        )}
      </header>

      {/* Hero */}
      <section style={{ maxWidth: 'var(--content-max)', margin: '0 auto', padding: 'clamp(40px,6vw,72px) var(--gutter-page) clamp(64px,8vw,96px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,460px),1fr))', gap: 56, alignItems: 'center' }}>
        <div style={{ display: 'grid', gap: 28, justifyItems: 'start' }}>
          <div style={{ whiteSpace: 'nowrap' }}>
            <StatusBadge status={availability}>{STATUS_LABEL[availability]}</StatusBadge>
          </div>
          <h1 style={{ margin: 0, font: '600 var(--type-display-size)/1.02 var(--font-display)', letterSpacing: 'var(--tracking-tight)', color: 'var(--text-strong)', textWrap: 'balance' }}>
            Web and mobile products, built end to end<span style={{ color: 'var(--accent)' }}>.</span>
          </h1>
          <p style={{ margin: 0, fontSize: 20, lineHeight: 1.6, color: 'var(--text-muted)', maxWidth: '52ch', textWrap: 'pretty' }}>
            I&apos;m Ralph Saridar, a full-stack developer working remotely from Awkar, Lebanon. I take your product from first scope to a launched web or mobile app, and I stay on after launch.
          </p>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {HERO_TAGS.map((t) => (
              <Tag key={t}>#{t}</Tag>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Button size="lg" iconRight="arrow-up-right" href="#contact" onClick={goContact}>
              Start a project
            </Button>
            <Button size="lg" variant="secondary" href="#work" onClick={goWork}>
              See my work
            </Button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px 20px', marginTop: 12, flexWrap: 'wrap' }}>
            <span className="eyebrow">Built products at</span>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <span className="company-pill">
                <img src="/assets/companies/optidist.png" alt="" style={{ height: 20 }} />
                OptiDist
              </span>
              <span className="company-pill">
                <img src="/assets/companies/globalistic.png" alt="" style={{ height: 20 }} />
                Globalistic
              </span>
            </div>
          </div>
        </div>
        <div className="card" style={{ padding: 'clamp(24px,3vw,32px)', borderRadius: 'var(--radius-xl)', display: 'grid', gap: 8 }}>
          <span className="eyebrow" style={{ paddingBottom: 12 }}>
            What happens after you get in touch
          </span>
          {site.process.map((s) => (
            <div key={s.step} style={{ display: 'grid', gridTemplateColumns: '40px minmax(0,1fr) auto', gap: 12, alignItems: 'baseline', padding: '16px 0', borderTop: '1px solid var(--border-subtle)' }}>
              <span style={{ font: '500 13px/1 var(--font-mono)', color: 'var(--text-subtle)' }}>{s.step}</span>
              <span style={{ font: '600 20px/1.25 var(--font-display)', color: 'var(--text-strong)' }}>{s.title}</span>
              <span style={{ font: '500 12px/1 var(--font-mono)', color: 'var(--text-muted)' }}>{s.duration}</span>
            </div>
          ))}
          <div style={{ paddingTop: 16, borderTop: '1px solid var(--border-subtle)', fontSize: 15, lineHeight: 1.5, color: 'var(--text-muted)' }}>You get a written scope with fixed-price milestones before any work starts.</div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="section-sunken">
        <div className="container" style={{ display: 'grid', gap: 48 }}>
          <SectionHeading index="01" eyebrow="Services" title="What I can build for you" lede="Most projects start as an MVP and grow from there. Every build comes with a written scope and weekly demos." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,340px),1fr))', gap: 20 }}>
            {site.services.map((s) => (
              <div
                key={s.id}
                onClick={() => openService(s)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), openService(s))}
                role="button"
                tabIndex={0}
                aria-label={s.title + ' details'}
                style={{ cursor: 'pointer', display: 'grid' }}
              >
                <ServiceCard icon={s.icon} title={s.title} description={s.description} deliverables={s.deliverables} stack={s.stack} featured={s.featured} />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '12px 20px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Button iconRight="arrow-up-right" href="#contact" onClick={goContact}>
              Start a project
            </Button>
            <span style={{ fontSize: 15, color: 'var(--text-muted)' }}>Open a service for deliverables and typical timeline.</span>
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work">
        <div className="container" style={{ display: 'grid', gap: 48 }}>
          <SectionHeading index="02" eyebrow="Selected work" title="Products I've shipped" lede="Personal projects and client builds. Open one to see what I built and the stack behind it." />
          <div style={{ display: 'flex', gap: '12px 20px', flexWrap: 'wrap', alignItems: 'center', marginTop: -16 }}>
            <OptionChips options={FILTERS} value={filter} onChange={(v) => setFilter(v || 'All')} />
            <span style={{ font: '500 12px/1 var(--font-mono)', color: 'var(--text-subtle)' }}>{filterCount}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 20 }}>
            {projects.map((p) => (
              <ProjectCard key={p.id} image={p.image} title={p.title} category={p.category} description={p.description} skills={p.skills} githubUrl={p.githubUrl} liveUrl={p.liveUrl} onClick={() => openModal(p)} />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="section-sunken">
        <div className="container" style={{ display: 'grid', gap: 48 }}>
          <SectionHeading index="03" eyebrow="How I work" title="From first call to launch" lede="Clear scope up front, something you can click every week, and support after launch." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))', gap: 20 }}>
            {site.process.map((s) => (
              <ProcessStep key={s.step} step={s.step} title={s.title} description={s.description} duration={s.duration} />
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience">
        <div className="container" style={{ display: 'grid', gap: 48 }}>
          <SectionHeading index="04" eyebrow="Experience" title="Building B2B marketplaces since 2021" />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '48px 64px', alignItems: 'flex-start' }}>
            <div style={{ flex: '1 1 520px', minWidth: 0, display: 'grid' }}>
              {site.experience.map((e) => (
                <ExperienceItem key={e.company} logo={e.logo} company={e.company} role={e.role} period={e.period} points={e.points} current={e.current} last={e.last} />
              ))}
            </div>
            <aside className="card" style={{ flex: '1 1 320px', minWidth: 0, position: 'sticky', top: 100, display: 'grid', gap: 24, padding: 28, borderRadius: 'var(--radius-lg)' }}>
              <span className="eyebrow-accent">Core stack</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {site.stack.map(([icon, name]) => (
                  <TechChip key={name} icon={icon || undefined} name={name} />
                ))}
              </div>
              <span className="eyebrow">Also used</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {site.stackMore.map(([icon, name]) => (
                  <TechChip key={name} icon={icon} name={name} size="sm" />
                ))}
              </div>
              <div style={{ display: 'grid', gap: 4, paddingTop: 20, borderTop: '1px solid var(--border-subtle)', fontSize: 15, lineHeight: 1.5 }}>
                <span style={{ color: 'var(--text-strong)' }}>BSc Computer Science</span>
                <span style={{ color: 'var(--text-muted)' }}>Lebanese International University · 2024</span>
              </div>
              <Button variant="secondary" iconLeft="download" href="/assets/Ralph-Saridar-CV.pdf" download="Ralph-Saridar-CV.pdf" style={{ justifySelf: 'start' }}>
                Download CV
              </Button>
            </aside>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section-sunken">
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '40px 64px', alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 300px', minWidth: 0 }}>
            <SectionHeading index="05" eyebrow="FAQ" title="Before you ask" lede="Anything else, ask on the discovery call." />
          </div>
          <div style={{ flex: '1.6 1 460px', minWidth: 0, display: 'grid', borderTop: '1px solid var(--border-subtle)' }}>
            {site.faq.map((f, i) => {
              const o = faqOpen === i;
              return (
                <div key={f.q} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <button onClick={() => setFaqOpen(o ? -1 : i)} aria-expanded={o} style={{ width: '100%', minHeight: 68, padding: '16px 0', background: 'none', border: 'none', display: 'flex', gap: 16, alignItems: 'center', justifyContent: 'space-between', textAlign: 'left', cursor: 'pointer', font: '600 20px/1.3 var(--font-display)', color: o ? 'var(--accent)' : 'var(--text-strong)' }}>
                    {f.q}
                    <span style={{ flex: 'none', display: 'grid', placeItems: 'center', width: 32, height: 32, borderRadius: '50%', border: '1px solid var(--border-default)', color: 'var(--text-muted)', transform: o ? 'rotate(45deg)' : 'none', transition: 'transform var(--dur-base) var(--ease-out)' }}>
                      <Icon name="plus" size={16} />
                    </span>
                  </button>
                  <div aria-hidden={!o} style={{ display: 'grid', gridTemplateRows: o ? '1fr' : '0fr', opacity: o ? 1 : 0, transition: 'grid-template-rows var(--dur-base) var(--ease-out),opacity var(--dur-base) var(--ease-out)' }}>
                    <div style={{ overflow: 'hidden', minHeight: 0 }}>
                      <p style={{ margin: 0, padding: '0 48px 24px 0', color: 'var(--text-muted)', maxWidth: '62ch', textWrap: 'pretty' }}>{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact">
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '48px 64px', alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 360px', minWidth: 0, display: 'grid', gap: 36 }}>
            <SectionHeading index="06" eyebrow="Contact" title="Tell me what you're building" lede="No commitment. Replies within 1 working day." />
            <div style={{ display: 'grid' }}>
              {contactRows.map((r) => (
                <a key={r.label} href={r.href} target={r.target} rel="noreferrer" style={{ display: 'flex', gap: 16, alignItems: 'center', minHeight: 64, borderTop: '1px solid var(--border-subtle)', color: 'var(--text-body)' }}>
                  <span style={{ width: 40, height: 40, borderRadius: 12, border: '1px solid var(--border-default)', display: 'grid', placeItems: 'center', color: 'var(--text-muted)', flex: 'none' }}>
                    <Icon name={r.icon} size={18} />
                  </span>
                  <span style={{ display: 'grid', gap: 2, minWidth: 0, flex: '1 1 auto' }}>
                    <span style={{ font: '500 11px/1.2 var(--font-mono)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: 'var(--text-subtle)' }}>{r.label}</span>
                    <span style={{ fontSize: 16, lineHeight: 1.4, overflowWrap: 'break-word' }}>{r.value}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
          <div className="card" style={{ flex: '1.3 1 460px', minWidth: 0, padding: 'clamp(20px,3vw,32px)', borderRadius: 'var(--radius-lg)', boxSizing: 'border-box' }}>
            {!sent ? (
              <form onSubmit={submit} noValidate style={{ display: 'grid', gap: 24 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,200px),1fr))', gap: 20 }}>
                  <TextField label="Your name" placeholder="Jane Founder" name="name" value={form.name} onChange={setField('name')} error={errors.name} required />
                  <TextField label="Email" type="email" placeholder="jane@startup.com" name="email" value={form.email} onChange={setField('email')} error={errors.email} required />
                </div>
                <TextField label="Tell me about the project" multiline rows={5} placeholder="What you're building, who it's for, and when you'd like to launch." name="message" value={form.message} onChange={setField('message')} error={errors.message} required />
                <div style={{ display: 'flex', gap: '12px 20px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <Button type="submit" size="lg" iconRight={sending ? 'loader' : 'send'} disabled={sending}>
                    {sending ? 'Sending' : 'Send inquiry'}
                  </Button>
                  <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>I reply within 1 working day.</span>
                </div>
                {sendError && (
                  <p role="alert" style={{ margin: 0, font: '400 14px/1.5 var(--font-body)', color: 'var(--status-error)' }}>
                    {sendError}
                  </p>
                )}
              </form>
            ) : (
              <div style={{ display: 'grid', gap: 20, justifyItems: 'start', padding: '24px 0' }}>
                <span style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--accent-soft)', color: 'var(--accent)', display: 'grid', placeItems: 'center' }}>
                  <Icon name="check" size={26} />
                </span>
                <h3 style={{ margin: 0, font: '600 32px/1.15 var(--font-display)', letterSpacing: 'var(--tracking-snug)', color: 'var(--text-strong)' }}>Inquiry sent</h3>
                <p style={{ margin: 0, color: 'var(--text-muted)', maxWidth: '44ch', textWrap: 'pretty' }}>
                  Thanks, {form.name}. I&apos;ll reply to {form.email} within 1 working day with times for a discovery call.
                </p>
                <Button variant="secondary" iconLeft="rotate-ccw" onClick={resetForm}>
                  Send another
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      <div style={{ background: 'var(--surface-sunken)', borderTop: '1px solid var(--border-subtle)' }}>
        <Footer name="Ralph Saridar" email={c.email} location="Awkar, Lebanon" socials={socials} />
      </div>

      {modal && <ProjectModal p={modal} onClose={closeModal} onHire={hireFromModal} />}
      {service && <ServiceModal s={service} onClose={closeModal} onHire={hireFromModal} />}
    </div>
  );
}

function CloseButton({ onClick, overImage }: { onClick: () => void; overImage?: boolean }) {
  return (
    <button
      onClick={onClick}
      aria-label="Close"
      style={
        overImage
          ? { position: 'absolute', top: 16, right: 16, width: 44, height: 44, borderRadius: '50%', border: 'none', background: 'rgba(0,23,45,.8)', color: 'var(--white)', display: 'grid', placeItems: 'center', cursor: 'pointer' }
          : { marginLeft: 'auto', width: 44, height: 44, borderRadius: '50%', border: '1px solid var(--border-default)', background: 'transparent', color: 'var(--text-strong)', display: 'grid', placeItems: 'center', cursor: 'pointer' }
      }
    >
      <Icon name="x" size={18} />
    </button>
  );
}

function ProjectModal({ p, onClose, onHire }: { p: Project; onClose: () => void; onHire: () => void }) {
  const liveLabel = (p.liveUrl || '').replace(/^https?:\/\//, '').replace(/\/$/, '');
  const stackChips = p.stack.length ? p.stack.map(([ic, n]) => ({ icon: ic ? (ic.includes('/') ? ic : '/assets/tech/' + ic + '.png') : undefined, name: n })) : [{ icon: undefined, name: '[Stack placeholder]' }];
  const screens = p.screens || [];
  return (
    <div className="overlay" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-label={p.title} className="dialog" onClick={(e) => e.stopPropagation()} style={{ width: 'min(960px,100%)' }}>
        <div style={{ position: 'relative', background: 'var(--paper-300)', aspectRatio: '16 / 8', display: 'grid', placeItems: 'center' }}>
          {p.image ? (
            <img src={p.image} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          ) : (
            <span style={{ font: '500 12px/1 var(--font-mono)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: 'var(--navy-500)' }}>Placeholder · cover image</span>
          )}
          <CloseButton onClick={onClose} overImage />
        </div>
        <div style={{ padding: 'clamp(20px,4vw,36px)', display: 'grid', gap: 20 }}>
          <span className="eyebrow-accent">{p.category}</span>
          <h2 style={{ margin: 0, font: '600 var(--type-h2-size)/1.1 var(--font-display)', letterSpacing: 'var(--tracking-tight)', color: 'var(--text-strong)' }}>{p.title}</h2>
          {p.liveUrl && (
            <a href={p.liveUrl} target="_blank" rel="noreferrer" style={{ justifySelf: 'start', display: 'inline-flex', gap: 8, alignItems: 'center', minHeight: 32, font: '500 14px/1 var(--font-mono)', color: 'var(--text-body)' }}>
              <Icon name="globe" size={16} />
              {liveLabel}
              <Icon name="arrow-up-right" size={14} />
            </a>
          )}
          <p style={{ margin: 0, fontSize: 20, lineHeight: 1.6, color: 'var(--text-muted)', maxWidth: '60ch', textWrap: 'pretty' }}>{p.description}</p>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {p.skills.map((k) => (
              <Tag key={k}>#{k}</Tag>
            ))}
          </div>
          <div className="divided">
            <span className="eyebrow-accent">01 — What I built</span>
            <p style={{ margin: 0, color: 'var(--text-body)', maxWidth: '62ch', textWrap: 'pretty' }}>{p.long}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,200px),1fr))', gap: 10 }}>
              {p.built.map((b) => (
                <div key={b} style={{ padding: 16, borderRadius: 'var(--radius-md)', background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 15, lineHeight: 1.45, color: 'var(--text-strong)' }}>
                  <Icon name="check" size={16} color="var(--accent)" style={{ marginTop: 3, flex: 'none' }} />
                  {b}
                </div>
              ))}
            </div>
          </div>
          <div className="divided">
            <span className="eyebrow-accent">02 — Stack</span>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {stackChips.map((t) => (
                <TechChip key={t.name} icon={t.icon} name={t.name} />
              ))}
            </div>
          </div>
          {screens.length > 0 && (
            <div className="divided">
              <span className="eyebrow-accent">03 — Screenshots</span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))', gap: 12 }}>
                {screens.map((x) => (
                  <div key={x} style={{ padding: 8, borderRadius: 'var(--radius-md)', background: 'var(--paper-100)' }}>
                    <img src={x} alt="" style={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', display: 'block', borderRadius: 8 }} />
                  </div>
                ))}
              </div>
            </div>
          )}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', paddingTop: 20, borderTop: '1px solid var(--border-subtle)', marginTop: 4 }}>
            <Button iconRight="arrow-up-right" onClick={onHire}>
              Build something like this
            </Button>
            {p.liveUrl && (
              <Button variant="secondary" iconRight="external-link" href={p.liveUrl} target="_blank">
                Visit website
              </Button>
            )}
            {p.githubUrl && (
              <Button variant="ghost" iconLeft="github" href={p.githubUrl} target="_blank">
                Source
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceModal({ s, onClose, onHire }: { s: Service; onClose: () => void; onHire: () => void }) {
  const fitLower = s.fit.charAt(0).toLowerCase() + s.fit.slice(1);
  return (
    <div className="overlay" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-label={s.title} className="dialog" onClick={(e) => e.stopPropagation()} style={{ width: 'min(760px,100%)', padding: 'clamp(20px,4vw,36px)', display: 'grid', gap: 22 }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <span style={{ width: 48, height: 48, borderRadius: 14, background: 'var(--accent-soft)', color: 'var(--accent)', display: 'grid', placeItems: 'center', flex: 'none' }}>
            <Icon name={s.icon} size={22} />
          </span>
          <span className="eyebrow">Service</span>
          <CloseButton onClick={onClose} />
        </div>
        <h2 style={{ margin: 0, font: '600 var(--type-h2-size)/1.1 var(--font-display)', letterSpacing: 'var(--tracking-tight)', color: 'var(--text-strong)', textWrap: 'balance' }}>{s.title}</h2>
        <p style={{ margin: 0, color: 'var(--text-body)', maxWidth: '58ch', textWrap: 'pretty' }}>{s.description}</p>
        <p style={{ margin: 0, fontSize: 16, color: 'var(--text-muted)', maxWidth: '58ch', textWrap: 'pretty' }}>
          <span style={{ color: 'var(--text-strong)', fontWeight: 600 }}>Good fit if</span> {fitLower}
        </p>
        <div style={{ display: 'grid', gap: 12, paddingTop: 22, borderTop: '1px solid var(--border-subtle)' }}>
          <span className="eyebrow">Deliverables</span>
          {s.more.map((d) => (
            <div key={d} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 16, lineHeight: 1.5, color: 'var(--text-body)' }}>
              <Icon name="check" size={16} color="var(--accent)" style={{ marginTop: 4, flex: 'none' }} />
              {d}
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 16, paddingTop: 22, borderTop: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'grid', gap: 6 }}>
            <span className="eyebrow" style={{ fontSize: 11 }}>
              Typical timeline
            </span>
            <span style={{ font: '600 20px/1.2 var(--font-display)', color: 'var(--text-strong)' }}>{s.timeline}</span>
          </div>
          <div style={{ display: 'grid', gap: 6 }}>
            <span className="eyebrow" style={{ fontSize: 11 }}>
              Pricing
            </span>
            <span style={{ fontSize: 15, lineHeight: 1.4, color: 'var(--text-body)' }}>Fixed price per milestone, quoted in the proposal</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {s.stack.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', paddingTop: 22, borderTop: '1px solid var(--border-subtle)' }}>
          <Button iconRight="arrow-up-right" onClick={onHire}>
            Start a project
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
