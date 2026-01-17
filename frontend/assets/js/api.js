(function () {
    // API base URL - since frontend is served by backend, use relative path
    const API_BASE = '/api';

    async function fetchJSON(url) {
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Request failed: ${res.status}`);
            return res.json();
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    }

    function renderProfile(profile) {
        if (!profile) return;

        // Update intro section
        const introName = document.getElementById('profile-intro-name');
        const introDesc = document.getElementById('profile-intro-desc');
        if (introName) introName.textContent = `This is ${profile.name}`;
        if (introDesc) introDesc.textContent = profile.description || '';

        // Update logo
        const logo = document.getElementById('profile-logo');
        if (logo) logo.textContent = profile.name.split(' ')[0];

        // Update About Me section
        const profileName = document.getElementById('profile-name');
        const profileTitle = document.getElementById('profile-title');
        const profileDesc = document.getElementById('profile-description');
        const profileEmail = document.getElementById('profile-email');
        const skillsList = document.getElementById('skills-list');

        if (profileName) profileName.textContent = `About ${profile.name}`;
        if (profileTitle) profileTitle.textContent = profile.title || '';
        if (profileDesc) profileDesc.textContent = profile.description || '';
        if (profileEmail) {
            profileEmail.textContent = profile.email || '';
            const emailLink = profileEmail.parentElement.querySelector('a');
            if (emailLink) emailLink.href = `mailto:${profile.email}`;
        }
        if (skillsList) skillsList.textContent = (profile.skills || []).join(', ');

        // Education
        const educationDiv = document.getElementById('profile-education');
        if (educationDiv && profile.education && profile.education.length > 0) {
            educationDiv.innerHTML = '<strong>Education:</strong><br>' +
                profile.education.map(edu =>
                    `${edu.degree} - ${edu.college} (${edu.year})`
                ).join('<br>');
        }

        // Profile links
        const profileLinks = document.getElementById('profile-links');
        if (profileLinks && profile.links) {
            const links = [];
            if (profile.links.github) links.push(`<li><a href="${profile.links.github}" target="_blank" class="button">GitHub</a></li>`);
            if (profile.links.linkedin) links.push(`<li><a href="${profile.links.linkedin}" target="_blank" class="button">LinkedIn</a></li>`);
            if (profile.links.resume) links.push(`<li><a href="${profile.links.resume}" target="_blank" class="button">Resume</a></li>`);
            profileLinks.innerHTML = links.join('');
        }

        // Social links in nav
        const socialLinks = document.getElementById('social-links');
        if (socialLinks && profile.links) {
            const links = [];
            if (profile.links.github) links.push(`<li><a href="${profile.links.github}" target="_blank" class="icon brands fa-github"><span class="label">GitHub</span></a></li>`);
            if (profile.links.linkedin) links.push(`<li><a href="${profile.links.linkedin}" target="_blank" class="icon brands fa-linkedin"><span class="label">LinkedIn</span></a></li>`);
            socialLinks.innerHTML = links.join('');
        }

        // Footer email
        const footerEmail = document.getElementById('footer-email');
        if (footerEmail && profile.email) {
            footerEmail.textContent = profile.email;
            footerEmail.href = `mailto:${profile.email}`;
        }

        // Footer social
        const footerSocial = document.getElementById('footer-social');
        if (footerSocial && profile.links) {
            const links = [];
            if (profile.links.github) links.push(`<li><a href="${profile.links.github}" target="_blank" class="icon brands alt fa-github"><span class="label">GitHub</span></a></li>`);
            if (profile.links.linkedin) links.push(`<li><a href="${profile.links.linkedin}" target="_blank" class="icon brands alt fa-linkedin"><span class="label">LinkedIn</span></a></li>`);
            footerSocial.innerHTML = links.join('');
        }

        // Copyright name
        const copyrightName = document.getElementById('copyright-name');
        if (copyrightName) copyrightName.textContent = profile.name;
    }

    function renderProjects(projects) {
        const container = document.getElementById('projects-list');
        if (!container) return;

        if (!projects || !projects.length) {
            container.innerHTML = '<p>No projects found.</p>';
            return;
        }

        container.innerHTML = projects.map((project) => `
            <article>
                <header>
                    <h2>${project.title}</h2>
                </header>
                ${project.description && Array.isArray(project.description) ?
                project.description.map(desc => `<p>${desc}</p>`).join('') :
                `<p>${project.description || ''}</p>`
            }
                <p><strong>Tech Stack:</strong> ${(project.techStack || []).join(', ')}</p>
                <ul class="actions special">
                    ${project.repo ? `<li><a class="button" href="${project.repo}" target="_blank">View on GitHub</a></li>` : ''}
                </ul>
            </article>
        `).join('');
    }

    async function loadProfile() {
        try {
            const data = await fetchJSON(`${API_BASE}/profile`);
            renderProfile(data);
            // Also load projects from the profile data
            if (data && data.projects) {
                renderProjects(data.projects);
            }
        } catch (err) {
            console.error('Failed to load profile:', err);
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        loadProfile();
    });
})();
