import { contact } from '../data/profile'
import { GitHubIcon, LinkedInIcon, MailIcon } from './icons'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Contact() {
  return (
    <Section
      id="contact"
      index="06"
      eyebrow="Contact"
      title="Travaillons ensemble."
      intro="Je cherche un premier stage technique en data engineering, IA appliquée ou développement. Le plus simple : un email."
    >
      <Reveal>
        <div className="flex flex-col gap-6 rounded border border-line bg-surface p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="mono-label">Email</p>
            <a
              href={`mailto:${contact.email}`}
              className="link-line mt-2 inline-block font-display text-xl font-semibold sm:text-2xl"
            >
              {contact.email}
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-line text-muted transition-colors hover:border-accent hover:text-accent-text"
            >
              <GitHubIcon width={20} height={20} />
            </a>

            {contact.linkedin ? (
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-line text-muted transition-colors hover:border-accent hover:text-accent-text"
              >
                <LinkedInIcon width={20} height={20} />
              </a>
            ) : (
              <span
                title="URL LinkedIn à fournir par Rudolf"
                aria-label="LinkedIn — à venir"
                className="inline-flex h-11 w-11 cursor-not-allowed items-center justify-center rounded-sm border border-dashed border-line text-faint"
              >
                <LinkedInIcon width={20} height={20} />
              </span>
            )}

            <a
              href={`mailto:${contact.email}`}
              aria-label="Envoyer un email"
              className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-line text-muted transition-colors hover:border-accent hover:text-accent-text"
            >
              <MailIcon width={20} height={20} />
            </a>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
