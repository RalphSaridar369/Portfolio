'use client';

// React ports of the Ralph Saridar design-system components (_ds_bundle.js).
import { useState, type CSSProperties, type MouseEvent, type ReactNode } from 'react';

type ClickHandler = (e: MouseEvent<HTMLElement>) => void;

export function Icon({ name, size = 20, color = 'currentColor', style, title }: { name: string; size?: number; color?: string; style?: CSSProperties; title?: string }) {
  const url = 'https://unpkg.com/lucide-static@0.460.0/icons/' + name + '.svg';
  return (
    <span
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      style={{
        display: 'inline-block',
        flex: 'none',
        width: size,
        height: size,
        background: color,
        WebkitMask: 'url(' + url + ') center/contain no-repeat',
        mask: 'url(' + url + ') center/contain no-repeat',
        ...style,
      }}
    />
  );
}

const SIZES = {
  sm: { h: 36, px: 14, fs: 14, ic: 16 },
  md: { h: 46, px: 20, fs: 16, ic: 18 },
  lg: { h: 56, px: 26, fs: 18, ic: 20 },
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  href,
  onClick,
  disabled,
  fullWidth,
  type = 'button',
  style,
  target,
  download,
}: {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'inverse';
  size?: keyof typeof SIZES;
  iconLeft?: string;
  iconRight?: string;
  href?: string;
  onClick?: ClickHandler;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit';
  style?: CSSProperties;
  target?: string;
  download?: boolean | string;
}) {
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);
  const s = SIZES[size];
  const v: CSSProperties = {
    primary: { background: hover ? 'var(--accent-hover)' : 'var(--accent)', color: 'var(--on-accent)', border: '1px solid transparent', boxShadow: hover ? 'var(--glow-accent)' : 'none' },
    secondary: { background: hover ? 'var(--accent-soft)' : 'transparent', color: 'var(--text-strong)', border: '1px solid ' + (hover ? 'var(--accent)' : 'var(--border-strong)') },
    ghost: { background: hover ? 'rgba(195,209,222,.08)' : 'transparent', color: hover ? 'var(--accent)' : 'var(--text-body)', border: '1px solid transparent' },
    inverse: { background: hover ? 'var(--navy-800)' : 'var(--navy-900)', color: 'var(--white)', border: '1px solid transparent' },
  }[variant];
  const base: CSSProperties = {
    display: fullWidth ? 'flex' : 'inline-flex',
    width: fullWidth ? '100%' : undefined,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: s.h,
    padding: '0 ' + s.px + 'px',
    borderRadius: 'var(--radius-pill)',
    font: '600 ' + s.fs + 'px/1 var(--font-body)',
    letterSpacing: '-0.005em',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    transition: 'background var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-fast), color var(--dur-fast), transform var(--dur-fast)',
    transform: down && !disabled ? 'translateY(1px) scale(.985)' : 'none',
    ...v,
    ...style,
  };
  const handlers = {
    onMouseEnter: () => !disabled && setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setDown(false);
    },
    onMouseDown: () => setDown(true),
    onMouseUp: () => setDown(false),
  };
  const inner = (
    <>
      {iconLeft && <Icon name={iconLeft} size={s.ic} />}
      <span>{children}</span>
      {iconRight && <Icon name={iconRight} size={s.ic} style={{ transition: 'transform var(--dur-base) var(--ease-out)', transform: hover ? 'translate(2px,-2px)' : 'none' }} />}
    </>
  );
  if (href && !disabled)
    return (
      <a href={href} target={target} download={download} rel={target ? 'noreferrer' : undefined} style={base} onClick={onClick} {...handlers}>
        {inner}
      </a>
    );
  return (
    <button type={type} disabled={disabled} onClick={onClick} style={base} {...handlers}>
      {inner}
    </button>
  );
}

export type Status = 'available' | 'busy' | 'closed';

export function StatusBadge({ status = 'available', children }: { status?: Status; children?: ReactNode }) {
  const c = { available: 'var(--status-available)', busy: 'var(--status-busy)', closed: 'var(--navy-400)' }[status];
  const label = children || { available: 'Available for freelance', busy: 'Booked — next slot soon', closed: 'Not taking projects' }[status];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, height: 32, padding: '0 14px 0 12px', borderRadius: 'var(--radius-pill)', background: 'rgba(195,209,222,.06)', border: '1px solid var(--border-default)', color: 'var(--text-body)', font: '500 13px/1 var(--font-body)' }}>
      <span style={{ position: 'relative', width: 8, height: 8, borderRadius: '50%', background: c, boxShadow: '0 0 0 4px color-mix(in oklab, ' + c + ' 25%, transparent)' }} />
      {label}
    </span>
  );
}

export function Tag({ children, tone = 'default', hash = false }: { children: ReactNode; tone?: 'default' | 'accent' | 'light'; hash?: boolean }) {
  const t: CSSProperties = {
    default: { background: 'rgba(195,209,222,.08)', color: 'var(--text-body)', border: '1px solid var(--border-default)' },
    accent: { background: 'var(--accent-soft)', color: 'var(--ember-300)', border: '1px solid rgba(228,119,54,.35)' },
    light: { background: 'var(--paper-200)', color: 'var(--navy-700)', border: '1px solid var(--paper-300)' },
  }[tone];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', height: 26, padding: '0 10px', borderRadius: 'var(--radius-pill)', font: '500 12px/1 var(--font-mono)', letterSpacing: '0.01em', whiteSpace: 'nowrap', ...t }}>
      {hash ? '#' : ''}
      {children}
    </span>
  );
}

export function SectionHeading({ index, eyebrow, title, lede, align = 'left', action }: { index?: string; eyebrow?: string; title: ReactNode; lede?: ReactNode; align?: 'left' | 'center'; action?: ReactNode }) {
  const center = align === 'center';
  return (
    <div style={{ display: 'flex', alignItems: center ? 'center' : 'flex-end', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap', textAlign: center ? 'center' : 'left', flexDirection: center ? 'column' : 'row' }}>
      <div style={{ display: 'grid', gap: 16, maxWidth: 720, justifyItems: center ? 'center' : 'start' }}>
        {(index || eyebrow) && (
          <div style={{ font: '500 12px/1 var(--font-mono)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: 'var(--accent)', display: 'flex', gap: 10, alignItems: 'center' }}>
            {index && <span>{index}</span>}
            {index && eyebrow && <span style={{ width: 24, height: 1, background: 'var(--accent)' }} />}
            {eyebrow}
          </div>
        )}
        <h2 style={{ font: '600 var(--fs-44)/1.08 var(--font-display)', letterSpacing: 'var(--tracking-tight)', color: 'var(--text-strong)', margin: 0 }}>{title}</h2>
        {lede && <p style={{ margin: 0, font: '400 18px/1.6 var(--font-body)', color: 'var(--text-muted)', maxWidth: '58ch' }}>{lede}</p>}
      </div>
      {action}
    </div>
  );
}

export function TechChip({ icon, name, size = 'md' }: { icon?: string; name: string; size?: 'sm' | 'md' }) {
  const d = size === 'sm' ? 36 : 48;
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: size === 'sm' ? '4px 14px 4px 4px' : '6px 18px 6px 6px', borderRadius: 'var(--radius-pill)', background: 'var(--surface-card)', border: '1px solid var(--border-subtle)' }}>
      <span style={{ width: d, height: d, borderRadius: '50%', background: 'var(--paper-100)', display: 'grid', placeItems: 'center', flex: 'none' }}>
        {icon && <img src={icon} alt="" style={{ width: d * 0.58, height: d * 0.58, objectFit: 'contain' }} />}
      </span>
      <span style={{ font: '500 ' + (size === 'sm' ? 14 : 15) + 'px/1 var(--font-body)', color: 'var(--text-strong)', whiteSpace: 'nowrap' }}>{name}</span>
    </div>
  );
}

export function ExperienceItem({ logo, company, role, period, points = [], current, last }: { logo?: string; company: string; role: string; period: string; points?: string[]; current?: boolean; last?: boolean }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '56px minmax(0,1fr)', gap: 24 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--paper-100)', display: 'grid', placeItems: 'center', boxShadow: current ? '0 0 0 4px var(--navy-900), 0 0 0 5px var(--accent)' : '0 0 0 4px var(--navy-900), 0 0 0 5px var(--border-strong)' }}>
          {logo && <img src={logo} alt={company} style={{ width: 30, height: 30, objectFit: 'contain' }} />}
        </div>
        {!last && <div style={{ flex: 1, width: 1, background: 'var(--border-default)', marginTop: 12, minHeight: 40 }} />}
      </div>
      <div style={{ paddingBottom: last ? 0 : 48 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: '6px 16px' }}>
          <h3 style={{ margin: 0, font: '600 22px/1.2 var(--font-display)', letterSpacing: '-0.015em', color: 'var(--text-strong)' }}>
            {role}
            <span style={{ color: 'var(--accent)' }}>{' · ' + company}</span>
          </h3>
          <span style={{ font: '400 13px/1 var(--font-mono)', color: 'var(--text-muted)' }}>{period}</span>
        </div>
        {points.length > 0 && (
          <ul style={{ margin: '16px 0 0', padding: 0, listStyle: 'none', display: 'grid', gap: 10 }}>
            {points.map((p, i) => (
              <li key={i} style={{ display: 'grid', gridTemplateColumns: '14px 1fr', gap: 8, font: '400 16px/1.55 var(--font-body)', color: 'var(--text-body)' }}>
                <span style={{ color: 'var(--accent)' }}>—</span>
                {p}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export function ProcessStep({ step, title, description, duration }: { step: string; title: string; description: string; duration?: string }) {
  return (
    <div style={{ display: 'grid', gap: 14, paddingTop: 22, borderTop: '1px solid var(--border-default)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ font: '600 44px/1 var(--font-display)', letterSpacing: '-0.03em', color: 'var(--accent)' }}>{step}</span>
        {duration && <span style={{ font: '400 12px/1 var(--font-mono)', color: 'var(--text-muted)' }}>{duration}</span>}
      </div>
      <h3 style={{ margin: 0, font: '600 20px/1.2 var(--font-display)', color: 'var(--text-strong)' }}>{title}</h3>
      <p style={{ margin: 0, font: '400 15px/1.6 var(--font-body)', color: 'var(--text-muted)' }}>{description}</p>
    </div>
  );
}

export function ProjectCard({ image, title, category, description, skills = [], githubUrl, liveUrl, onClick }: { image?: string; title: string; category?: string; description?: string; skills?: string[]; githubUrl?: string; liveUrl?: string; onClick?: () => void }) {
  const [h, setH] = useState(false);
  const link = (href: string | undefined, name: string, label: string) =>
    href && (
      <a href={href} target="_blank" rel="noreferrer" aria-label={label} onClick={(e) => e.stopPropagation()} style={{ width: 38, height: 38, borderRadius: '50%', display: 'grid', placeItems: 'center', border: '1px solid var(--paper-300)', color: 'var(--navy-900)', background: '#fff' }}>
        <Icon name={name} size={17} />
      </a>
    );
  return (
    <article
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{ display: 'flex', flexDirection: 'column', gap: 18, padding: 14, paddingBottom: 22, borderRadius: 'var(--radius-lg)', background: 'var(--paper-100)', color: 'var(--navy-900)', cursor: onClick ? 'pointer' : 'default', boxShadow: h ? '0 30px 60px -24px rgba(0,8,18,.8)' : 'var(--shadow-card)', transform: h ? 'translateY(-4px)' : 'none', transition: 'all var(--dur-base) var(--ease-out)', height: '100%', boxSizing: 'border-box' }}
    >
      <div style={{ borderRadius: 14, overflow: 'hidden', aspectRatio: '16 / 10', background: 'var(--paper-300)' }}>
        {image && <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: h ? 'scale(1.04)' : 'none', transition: 'transform var(--dur-slow) var(--ease-out)' }} />}
      </div>
      <div style={{ padding: '0 8px', display: 'grid', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div>
            {category && <div style={{ font: '500 11px/1 var(--font-mono)', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ember-600)', marginBottom: 8 }}>{category}</div>}
            <h3 style={{ margin: 0, font: '600 26px/1.1 var(--font-display)', letterSpacing: '-0.02em', color: 'var(--navy-900)' }}>{title}</h3>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {link(githubUrl, 'github', 'Source code')}
            {link(liveUrl, 'arrow-up-right', 'Live site')}
          </div>
        </div>
        {description && <p style={{ margin: 0, font: '400 15px/1.6 var(--font-body)', color: 'var(--navy-600)' }}>{description}</p>}
        {skills.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
            {skills.map((s) => (
              <Tag key={s} tone="light" hash>
                {s}
              </Tag>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export function ServiceCard({ icon = 'code-xml', title, description, deliverables = [], stack = [], featured }: { icon?: string; title: string; description: string; deliverables?: string[]; stack?: string[]; featured?: boolean }) {
  const [h, setH] = useState(false);
  return (
    <article
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: 28, borderRadius: 'var(--radius-lg)', background: featured ? 'linear-gradient(180deg, rgba(228,119,54,.10), rgba(228,119,54,0) 60%), var(--surface-card)' : h ? 'var(--surface-card-hover)' : 'var(--surface-card)', border: '1px solid ' + (h || featured ? 'rgba(228,119,54,.45)' : 'var(--border-subtle)'), boxShadow: 'var(--shadow-card)', transform: h ? 'translateY(-4px)' : 'none', transition: 'all var(--dur-base) var(--ease-out)', height: '100%', boxSizing: 'border-box' }}
    >
      <div style={{ width: 48, height: 48, borderRadius: 14, display: 'grid', placeItems: 'center', background: 'var(--accent-soft)', color: 'var(--accent)' }}>
        <Icon name={icon} size={24} />
      </div>
      <div style={{ display: 'grid', gap: 10 }}>
        <h3 style={{ margin: 0, font: '600 24px/1.15 var(--font-display)', letterSpacing: '-0.015em', color: 'var(--text-strong)' }}>{title}</h3>
        <p style={{ margin: 0, font: '400 16px/1.6 var(--font-body)', color: 'var(--text-muted)' }}>{description}</p>
      </div>
      {deliverables.length > 0 && (
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 10 }}>
          {deliverables.map((d) => (
            <li key={d} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', font: '400 15px/1.45 var(--font-body)', color: 'var(--text-body)' }}>
              <Icon name="check" size={16} color="var(--accent)" style={{ marginTop: 3 }} />
              {d}
            </li>
          ))}
        </ul>
      )}
      {stack.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'auto', paddingTop: 4 }}>
          {stack.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
      )}
    </article>
  );
}

export function OptionChips({ options = [], value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {options.map((o) => {
        const on = value === o;
        return (
          <button key={o} type="button" onClick={() => onChange(o)} aria-pressed={on} style={{ height: 38, padding: '0 16px', borderRadius: 'var(--radius-pill)', cursor: 'pointer', font: '500 14px/1 var(--font-body)', background: on ? 'var(--accent)' : 'transparent', color: on ? 'var(--on-accent)' : 'var(--text-body)', border: '1px solid ' + (on ? 'var(--accent)' : 'var(--border-strong)'), transition: 'all var(--dur-fast) var(--ease-out)' }}>
            {o}
          </button>
        );
      })}
    </div>
  );
}

export function TextField({ label, placeholder, value, onChange, multiline, rows = 5, type = 'text', hint, error, name, required }: { label?: string; placeholder?: string; value: string; onChange: (v: string) => void; multiline?: boolean; rows?: number; type?: string; hint?: string; error?: string; name?: string; required?: boolean }) {
  const [focus, setFocus] = useState(false);
  const border = error ? 'var(--status-error)' : focus ? 'var(--accent)' : 'var(--border-default)';
  const field: CSSProperties = {
    width: '100%',
    boxSizing: 'border-box',
    padding: multiline ? '14px 16px' : '0 16px',
    height: multiline ? 'auto' : 50,
    minHeight: multiline ? rows * 26 : undefined,
    resize: 'vertical',
    background: 'var(--surface-sunken)',
    color: 'var(--text-strong)',
    border: '1px solid ' + border,
    borderRadius: 'var(--radius-md)',
    font: '400 16px/1.5 var(--font-body)',
    outline: 'none',
    boxShadow: focus && !error ? 'var(--focus-ring)' : 'none',
    transition: 'border-color var(--dur-fast), box-shadow var(--dur-base) var(--ease-out)',
  };
  const props = {
    name,
    value,
    placeholder,
    required,
    onChange: (e: { target: { value: string } }) => onChange(e.target.value),
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: field,
  };
  return (
    <label style={{ display: 'grid', gap: 8 }}>
      {label && (
        <span style={{ font: '500 14px/1 var(--font-body)', color: 'var(--text-body)' }}>
          {label}
          {required && <span style={{ color: 'var(--accent)' }}> *</span>}
        </span>
      )}
      {multiline ? <textarea {...props} rows={rows} /> : <input {...props} type={type} />}
      {(error || hint) && <span style={{ font: '400 13px/1.4 var(--font-body)', color: error ? 'var(--status-error)' : 'var(--text-muted)' }}>{error || hint}</span>}
    </label>
  );
}

export function Footer({ name = 'Ralph Saridar', email, location, socials = [] }: { name?: string; email?: string; location?: string; socials?: { icon: string; href: string; label: string }[] }) {
  return (
    <footer style={{ borderTop: '1px solid var(--border-subtle)', padding: '28px var(--gutter-page)', display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center', justifyContent: 'space-between', font: '400 14px/1.4 var(--font-body)', color: 'var(--text-muted)', maxWidth: 'var(--content-max)', margin: '0 auto', boxSizing: 'border-box' }}>
      <span>{'© ' + new Date().getFullYear() + ' ' + name + (location ? ' · ' + location : '')}</span>
      <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
        {email && (
          <a href={'mailto:' + email} style={{ color: 'var(--text-body)', display: 'inline-flex', gap: 8, alignItems: 'center' }}>
            <Icon name="mail" size={16} />
            {email}
          </a>
        )}
        {socials.map((s) => (
          <a key={s.icon} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} style={{ color: 'var(--text-body)', display: 'inline-flex' }}>
            <Icon name={s.icon} size={18} />
          </a>
        ))}
      </div>
    </footer>
  );
}

function NavLink({ label, href, active, onClick }: { label: string; href: string; active: boolean; onClick: ClickHandler }) {
  const [h, setH] = useState(false);
  const on = h || active;
  return (
    <a href={href} onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ position: 'relative', font: '500 15px/1 var(--font-body)', color: on ? 'var(--accent)' : 'var(--text-body)', padding: '6px 0', textDecoration: 'none', transition: 'color var(--dur-fast)' }}>
      {label}
      <span style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 1, background: 'var(--accent)', transform: on ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: 'transform var(--dur-base) var(--ease-out)' }} />
    </a>
  );
}

export function NavBar({ logoSrc, name = 'Ralph Saridar', links = [], active, onNavigate, ctaLabel = 'Hire me', ctaHref = '#contact', onCta }: { logoSrc?: string; name?: string; links: { id: string; label: string }[]; active: string; onNavigate: (id: string, e: MouseEvent<HTMLElement>) => void; ctaLabel?: string; ctaHref?: string; onCta?: ClickHandler }) {
  return (
    <header>
      <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto', padding: '0 var(--gutter-page)', height: 76, display: 'flex', alignItems: 'center', gap: 40 }}>
        <a href="#top" onClick={(e) => onNavigate('top', e)} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          {logoSrc ? <img src={logoSrc} alt={name} style={{ height: 26 }} /> : <span style={{ font: '700 18px/1 var(--font-display)', letterSpacing: '0.02em', textTransform: 'uppercase', color: 'var(--accent)' }}>{name}</span>}
        </a>
        <nav style={{ display: 'flex', gap: 32, marginLeft: 'auto' }}>
          {links.map((l) => (
            <NavLink key={l.id} label={l.label} href={'#' + l.id} active={active === l.id} onClick={(e) => onNavigate(l.id, e)} />
          ))}
        </nav>
        <Button size="sm" href={ctaHref} onClick={onCta} iconRight="arrow-up-right">
          {ctaLabel}
        </Button>
      </div>
    </header>
  );
}
