/**
 * DJ Stefan Nolte - Modern JavaScript
 * Interactivity: Navbar scroll spy, mobile menu, quick copy & booking form helpers
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation Scroll Effect
    const siteNav = document.querySelector('.site-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            siteNav?.classList.add('scrolled');
        } else {
            siteNav?.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            mobileToggle.setAttribute('aria-expanded', isOpen);
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                if (isOpen) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close mobile menu when a nav link is clicked
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // 3. Scroll Spy for active navigation link
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    function updateActiveNav() {
        const scrollPosition = window.scrollY + 120;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollPosition >= top && scrollPosition < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    window.addEventListener('scroll', updateActiveNav);

    // 4. Toast Notification & Copy to Clipboard
    const toastNotice = document.getElementById('toastNotice');
    let toastTimeout;

    function showToast(message) {
        if (!toastNotice) return;
        const textSpan = toastNotice.querySelector('.toast-text');
        if (textSpan) textSpan.textContent = message;
        toastNotice.classList.add('show');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toastNotice.classList.remove('show');
        }, 2800);
    }

    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const textToCopy = btn.getAttribute('data-copy');
            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    showToast(`Kopiert: ${textToCopy}`);
                }).catch(() => {
                    showToast('Konnte nicht kopiert werden.');
                });
            }
        });
    });

    // 5. Booking / Contact Form Integration
    const bookingForm = document.getElementById('bookingForm');
    const sendMailBtn = document.getElementById('sendMailBtn');
    const sendWhatsAppBtn = document.getElementById('sendWhatsAppBtn');

    function getFormData() {
        const name = document.getElementById('formName')?.value.trim() || 'Interessent';
        const date = document.getElementById('formDate')?.value || 'Noch offen';
        const eventType = document.getElementById('formType')?.value || 'Event';
        const guests = document.getElementById('formGuests')?.value || 'Unbekannt';
        const notes = document.getElementById('formNotes')?.value.trim() || 'Keine weiteren Details.';

        return { name, date, eventType, guests, notes };
    }

    if (sendMailBtn) {
        sendMailBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const { name, date, eventType, guests, notes } = getFormData();
            const subject = encodeURIComponent(`DJ-Anfrage von ${name} für ${eventType}`);
            const body = encodeURIComponent(
                `Hallo Stefan,\n\nich möchte unverbindlich anfragen für ein Event:\n\n` +
                `- Name: ${name}\n` +
                `- Event-Art: ${eventType}\n` +
                `- Datum: ${date}\n` +
                `- Ca. Gästeanzahl: ${guests}\n\n` +
                `Details / Musikwünsche:\n${notes}\n\n` +
                `Viele Grüße,\n${name}`
            );
            window.location.href = `mailto:info@djnolte.de?subject=${subject}&body=${body}`;
        });
    }

    if (sendWhatsAppBtn) {
        sendWhatsAppBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const { name, date, eventType, guests, notes } = getFormData();
            const text = encodeURIComponent(
                `Hallo Stefan, hier ist ${name}. Ich möchte ein Event anfragen:\n` +
                `🎉 Art: ${eventType}\n` +
                `📅 Datum: ${date}\n` +
                `👥 Gäste: ca. ${guests}\n` +
                `📝 Details: ${notes}`
            );
            window.open(`https://wa.me/4915775430433?text=${text}`, '_blank');
        });
    }

    // 6. Impressum Accordion Toggle
    const legalAccordion = document.getElementById('legalAccordion');
    const legalToggle = document.getElementById('legalToggle');

    if (legalToggle && legalAccordion) {
        legalToggle.addEventListener('click', () => {
            legalAccordion.classList.toggle('open');
        });
    }

    // 7. Smooth Scroll for Back-To-Top
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
