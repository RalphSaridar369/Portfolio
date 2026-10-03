export const EMPTY_FORM = { name: '', email: '', message: '' };

export type Form = typeof EMPTY_FORM;
export type Errors = Partial<Record<keyof Form, string>>;

export const LIMITS = { name: 100, email: 200, message: 5000 };

export function validate(f: Form): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = 'Add your name.';
  else if (f.name.length > LIMITS.name) e.name = 'That name is too long.';
  if (!f.email.trim()) e.email = 'Add an email so I can reply.';
  else if (f.email.length > LIMITS.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = 'That email doesn’t look right.';
  if (f.message.trim().length < 20) e.message = 'A sentence or two helps me prepare. At least 20 characters.';
  else if (f.message.length > LIMITS.message) e.message = 'Please keep it under 5,000 characters.';
  return e;
}
