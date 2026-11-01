/**
 * ============================================================================
 * CareerTrack — Placement Application Tracker
 * Frontend Core Logic (Vanilla JavaScript ES6+)
 * 
 * Architecture Overview:
 * 1. State Management & Storage (localStorage persistence & demo seeds)
 * 2. Theme & Appearance Management (Dark/Light mode)
 * 3. Navigation & Routing (Single Page App routing without page reload)
 * 4. Applications Module (CRUD, search, filtering, sorting, validation)
 * 5. Interviews Module (CRUD, tabs filtering, status updates)
 * 6. Calendar Module (Monthly matrix generation & agenda linkage)
 * 7. Analytics & Charts Module (Mathematical aggregations & Canvas rendering)
 * 8. Dashboard Module (KPI cards, activity feeds, greetings)
 * 9. Settings Module (User profile, preferences, data reset/wipe)
 * 10. UI Utilities & Modals (Toasts, dialogs, responsive sidebar)
 * ============================================================================
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Initial Demo Data Seed (Used on first run or when reset is requested)
  // --------------------------------------------------------------------------
  const DEMO_APPLICATIONS = [
    {
      id: 'app_1',
      company: 'Google',
      role: 'Associate Software Engineer',
      location: 'Bangalore, India (Hybrid)',
      jobType: 'Full-time',
      date: '2026-10-15',
      deadline: '2026-11-20',
      status: 'Interview',
      url: 'https://careers.google.com/jobs/results/12345',
      notes: 'Passed initial screening. Need to practice graph algorithms, dynamic programming, and concurrency.'
    },
    {
      id: 'app_2',
      company: 'Microsoft',
      role: 'Software Development Engineer (SDE 1)',
      location: 'Hyderabad, India (On-site)',
      jobType: 'Full-time',
      date: '2026-10-18',
      deadline: '2026-11-15',
      status: 'Assessment',
      url: 'https://careers.microsoft.com/us/en/job/67890',
      notes: 'Online assessment received via Codility. 3 questions on tree traversals and string manipulation.'
    },
    {
      id: 'app_3',
      company: 'Atlassian',
      role: 'Graduate Software Developer',
      location: 'Bangalore, India (Remote)',
      jobType: 'Full-time',
      date: '2026-09-25',
      deadline: '2026-10-30',
      status: 'Offer',
      url: 'https://www.atlassian.com/company/careers',
      notes: 'Received official offer letter! Competitive compensation with ESOPs. Reviewing terms before Nov 10.'
    },
    {
      id: 'app_4',
      company: 'Amazon',
      role: 'Frontend Engineer Intern',
      location: 'Bangalore, India (Hybrid)',
      jobType: 'Internship',
      date: '2026-10-24',
      deadline: '2026-11-12',
      status: 'Applied',
      url: 'https://amazon.jobs/en/jobs/45678',
      notes: 'Applied through university referral link. Waiting for HR review.'
    },
    {
      id: 'app_5',
      company: 'Uber',
      role: 'Backend Systems Engineer',
      location: 'Bangalore, India (On-site)',
      jobType: 'Full-time',
      date: '2026-10-08',
      deadline: '2026-11-05',
      status: 'Interview',
      url: 'https://uber.com/careers/9988',
      notes: 'System design round focusing on distributed caching and microservice architectures.'
    },
    {
      id: 'app_6',
      company: 'Adobe',
      role: 'Web Application Engineer',
      location: 'Noida, India (Hybrid)',
      jobType: 'Full-time',
      date: '2026-10-28',
      deadline: '2026-11-18',
      status: 'Assessment',
      url: 'https://adobe.wd5.myworkdayjobs.com/careers',
      notes: 'HackerRank test link active for 5 days. 2 Coding questions + CS Fundamentals MCQs.'
    },
    {
      id: 'app_7',
      company: 'Stripe',
      role: 'Infrastructure Engineer',
      location: 'Remote',
      jobType: 'Full-time',
      date: '2026-09-10',
      deadline: '2026-09-30',
      status: 'Rejected',
      url: 'https://stripe.com/jobs',
      notes: 'Received feedback: Strong algorithmic performance, but looking for more production Kubernetes experience.'
    },
    {
      id: 'app_8',
      company: 'Goldman Sachs',
      role: 'New Analyst - Engineering',
      location: 'Bangalore, India (On-site)',
      jobType: 'Full-time',
      date: '2026-10-29',
      deadline: '2026-11-25',
      status: 'Applied',
      url: 'https://goldmansachs.com/careers',
      notes: 'Aptitude and coding assessment invitation pending.'
    }
  ];

  const DEMO_INTERVIEWS = [
    {
      id: 'int_1',
      company: 'Google',
      role: 'Associate Software Engineer',
      date: '2026-11-03',
      time: '14:00',
      round: 'Technical Round 1 (DSA / Problem Solving)',
      mode: 'Online',
      linkLocation: 'https://meet.google.com/qwe-rty-uio',
      status: 'Upcoming',
      notes: 'Prepare Graph algorithms (BFS/DFS, Dijkstra), Union-Find, and time/space complexity analysis.'
    },
    {
      id: 'int_2',
      company: 'Uber',
      role: 'Backend Systems Engineer',
      date: '2026-11-07',
      time: '16:30',
      round: 'Technical Round 2 (System Design / Core)',
      mode: 'Online',
      linkLocation: 'https://zoom.us/j/123456789',
      status: 'Upcoming',
      notes: 'Design a real-time ride tracking system with geo-sharding and WebSockets.'
    },
    {
      id: 'int_3',
      company: 'Atlassian',
      role: 'Graduate Software Developer',
      date: '2026-10-20',
      time: '11:00',
      round: 'HR / Cultural Fit',
      mode: 'Online',
      linkLocation: 'Completed via Zoom',
      status: 'Completed',
      notes: 'Great conversation regarding team culture and values. Resulted in offer!'
    },
    {
      id: 'int_4',
      company: 'Microsoft',
      role: 'Software Development Engineer (SDE 1)',
      date: '2026-11-10',
      time: '10:00',
      round: 'Online Coding Assessment',
      mode: 'Online',
      linkLocation: 'https://codility.com/c/test/xyz',
      status: 'Upcoming',
      notes: 'Keep scratch paper ready. 90 minutes test duration.'
    }
  ];

  const DEFAULT_PROFILE = {
    name: 'Candidate',
    email: 'candidate@example.com',
    targetRole: 'Full Stack Software Engineer',
    university: 'Class of 2026 - Computer Science'
  };

  // --------------------------------------------------------------------------
  // 2. Global State Store
  // --------------------------------------------------------------------------
  const Store = {
    STORAGE_KEYS: {
      APPLICATIONS: 'careertrack_apps_v1',
      INTERVIEWS: 'careertrack_interviews_v1',
      PROFILE: 'careertrack_profile_v1',
      THEME: 'careertrack_theme_v1',
      NOTIFS: 'careertrack_notifs_v1'
    },

    getApplications() {
      const data = localStorage.getItem(this.STORAGE_KEYS.APPLICATIONS);
      if (!data) {
        this.saveApplications(DEMO_APPLICATIONS);
        return [...DEMO_APPLICATIONS];
      }
      try {
        return JSON.parse(data);
      } catch (e) {
        console.error('Error parsing applications from localStorage:', e);
        return [];
      }
    },

    saveApplications(apps) {
      localStorage.setItem(this.STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));
    },

    getInterviews() {
      const data = localStorage.getItem(this.STORAGE_KEYS.INTERVIEWS);
      if (!data) {
        this.saveInterviews(DEMO_INTERVIEWS);
        return [...DEMO_INTERVIEWS];
      }
      try {
        return JSON.parse(data);
      } catch (e) {
        console.error('Error parsing interviews from localStorage:', e);
        return [];
      }
    },

    saveInterviews(ints) {
      localStorage.setItem(this.STORAGE_KEYS.INTERVIEWS, JSON.stringify(ints));
    },

    getProfile() {
      const data = localStorage.getItem(this.STORAGE_KEYS.PROFILE);
      if (!data) {
        this.saveProfile(DEFAULT_PROFILE);
        return { ...DEFAULT_PROFILE };
      }
      try {
        return JSON.parse(data);
      } catch (e) {
        return { ...DEFAULT_PROFILE };
      }
    },

    saveProfile(profile) {
      localStorage.setItem(this.STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    },

    getTheme() {
      return localStorage.getItem(this.STORAGE_KEYS.THEME) || 'light';
    },

    saveTheme(theme) {
      localStorage.setItem(this.STORAGE_KEYS.THEME, theme);
    },

    resetAllToDemo() {
      localStorage.setItem(this.STORAGE_KEYS.APPLICATIONS, JSON.stringify(DEMO_APPLICATIONS));
      localStorage.setItem(this.STORAGE_KEYS.INTERVIEWS, JSON.stringify(DEMO_INTERVIEWS));
      localStorage.setItem(this.STORAGE_KEYS.PROFILE, JSON.stringify(DEFAULT_PROFILE));
    },

    clearAll() {
      localStorage.removeItem(this.STORAGE_KEYS.APPLICATIONS);
      localStorage.removeItem(this.STORAGE_KEYS.INTERVIEWS);
    }
  };

  // State in memory
  let applications = [];
  let interviews = [];
  let userProfile = {};
  let currentCalendarDate = new Date(2026, 10, 1); // Nov 2026 base
  let selectedCalendarDateStr = '2026-11-03';
  let activeInterviewTab = 'all';
  let deleteTarget = null; // { type: 'app' | 'interview', id: string }

  // --------------------------------------------------------------------------
  // 3. Theme Engine
  // --------------------------------------------------------------------------
  const Theme = {
    init() {
      const savedTheme = Store.getTheme();
      this.apply(savedTheme);

      const toggleBtn = document.getElementById('themeToggleBtn');
      if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
          const current = document.documentElement.getAttribute('data-theme') || 'dark';
          const next = current === 'dark' ? 'light' : 'dark';
          this.apply(next);
          Store.saveTheme(next);
          showToast(`Switched to ${next} mode`, 'info');
        });
      }

      // Settings radio inputs sync
      const radioDark = document.getElementById('themeChoiceDark');
      const radioLight = document.getElementById('themeChoiceLight');
      if (radioDark && radioLight) {
        radioDark.checked = savedTheme === 'dark';
        radioLight.checked = savedTheme === 'light';

        radioDark.addEventListener('change', () => {
          this.apply('dark');
          Store.saveTheme('dark');
        });
        radioLight.addEventListener('change', () => {
          this.apply('light');
          Store.saveTheme('light');
        });
      }
    },

    apply(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      const radioDark = document.getElementById('themeChoiceDark');
      const radioLight = document.getElementById('themeChoiceLight');
      if (radioDark && radioLight) {
        radioDark.checked = theme === 'dark';
        radioLight.checked = theme === 'light';
      }

      // Re-render visual charts so grid and text colors match new theme
      Charts.renderDashboardCharts();
      Charts.renderVelocityChart();
    }
  };

  // --------------------------------------------------------------------------
  // 4. Navigation & Single Page Routing
  // --------------------------------------------------------------------------
  const Navigation = {
    titles: {
      dashboard: { title: 'Dashboard', subtitle: 'Track and manage your recruitment pipeline' },
      applications: { title: 'My Applications', subtitle: 'Detailed record of companies and recruitment stages' },
      interviews: { title: 'Interview Schedule', subtitle: 'Upcoming interaction rounds and prep reminders' },
      calendar: { title: 'Recruitment Calendar', subtitle: 'Schedule of deadlines, assessments, and rounds' },
      analytics: { title: 'Pipeline Analytics', subtitle: 'Performance metrics and application conversion funnel' },
      settings: { title: 'Settings & Preferences', subtitle: 'Manage your profile, theme, and application data' }
    },

    init() {
      // Sidebar link clicks
      const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
      navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetSection = link.getAttribute('data-section');
          this.navigateTo(targetSection);
          this.closeMobileSidebar();
        });
      });

      // Quick dashboard navigation buttons
      const dashViewAllApps = document.getElementById('dashViewAllApps');
      if (dashViewAllApps) {
        dashViewAllApps.addEventListener('click', () => this.navigateTo('applications'));
      }

      const dashViewAllInterviews = document.getElementById('dashViewAllInterviews');
      if (dashViewAllInterviews) {
        dashViewAllInterviews.addEventListener('click', () => this.navigateTo('interviews'));
      }

      // Mobile Menu Drawer toggling
      const mobileBtn = document.getElementById('mobileMenuBtn');
      const closeBtn = document.getElementById('sidebarCloseBtn');
      const overlay = document.getElementById('sidebarOverlay');
      const sidebar = document.getElementById('sidebar');

      if (mobileBtn && sidebar && overlay) {
        mobileBtn.addEventListener('click', () => {
          sidebar.classList.add('open');
          overlay.classList.add('open');
        });
      }

      if (closeBtn && sidebar && overlay) {
        closeBtn.addEventListener('click', () => this.closeMobileSidebar());
        overlay.addEventListener('click', () => this.closeMobileSidebar());
      }

      // Handle direct hash navigation
      window.addEventListener('hashchange', () => {
        const hash = window.location.hash.replace('#', '');
        if (hash && this.titles[hash]) {
          this.navigateTo(hash, false);
        }
      });

      // Initial check
      const initialHash = window.location.hash.replace('#', '');
      if (initialHash && this.titles[initialHash]) {
        this.navigateTo(initialHash, false);
      } else {
        this.navigateTo('dashboard', false);
      }
    },

    navigateTo(sectionId, updateHash = true) {
      if (!this.titles[sectionId]) return;

      // Update active nav link
      document.querySelectorAll('.sidebar-nav .nav-link').forEach(link => {
        if (link.getAttribute('data-section') === sectionId) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });

      // Switch active section
      document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
      });
      const activeSec = document.getElementById(`section-${sectionId}`);
      if (activeSec) {
        activeSec.classList.add('active');
      }

      // Update Topbar Title & Subtitle
      const titleEl = document.getElementById('pageTitle');
      const subtitleEl = document.getElementById('pageSubtitle');
      if (titleEl) titleEl.textContent = this.titles[sectionId].title;
      if (subtitleEl) subtitleEl.textContent = this.titles[sectionId].subtitle;

      if (updateHash) {
        window.location.hash = sectionId;
      }

      // Trigger section-specific refresh
      if (sectionId === 'dashboard') {
        Dashboard.refresh();
      } else if (sectionId === 'applications') {
        Applications.render();
      } else if (sectionId === 'interviews') {
        Interviews.render();
      } else if (sectionId === 'calendar') {
        Calendar.render();
      } else if (sectionId === 'analytics') {
        Analytics.render();
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    closeMobileSidebar() {
      const sidebar = document.getElementById('sidebar');
      const overlay = document.getElementById('sidebarOverlay');
      if (sidebar) sidebar.classList.remove('open');
      if (overlay) overlay.classList.remove('open');
    }
  };

  // --------------------------------------------------------------------------
  // 5. Applications Module (CRUD, Filter, Search, Sort)
  // --------------------------------------------------------------------------
  const Applications = {
    init() {
      // Search and Filter Listeners
      const searchInput = document.getElementById('appSearchInput');
      const statusFilter = document.getElementById('appStatusFilter');
      const typeFilter = document.getElementById('appJobTypeFilter') || document.getElementById('appTypeFilter');
      const sortFilter = document.getElementById('appSortFilter');

      if (searchInput) searchInput.addEventListener('input', () => this.render());
      if (statusFilter) statusFilter.addEventListener('change', () => this.render());
      if (typeFilter) typeFilter.addEventListener('change', () => this.render());
      if (sortFilter) sortFilter.addEventListener('change', () => this.render());

      // Global Navbar Search
      const globalSearch = document.getElementById('globalSearchInput');
      if (globalSearch) {
        globalSearch.addEventListener('input', (e) => {
          const val = e.target.value.trim();
          if (val.length > 0) {
            Navigation.navigateTo('applications');
            if (searchInput) {
              searchInput.value = val;
              this.render();
            }
          }
        });
      }

      // Add Application Modal buttons
      const addBtns = [
        document.getElementById('openAddAppModalBtn'),
        document.getElementById('dashAddAppBtn'),
        document.getElementById('emptyAddAppBtn')
      ];

      addBtns.forEach(btn => {
        if (btn) {
          btn.addEventListener('click', () => this.openModal());
        }
      });

      // App Modal Form Submission
      const form = document.getElementById('appForm');
      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          this.handleSubmit();
        });
      }

      // App Modal Cancel/Close buttons
      const closeBtn = document.getElementById('closeAppModalBtn');
      const cancelBtn = document.getElementById('cancelAppBtn');
      if (closeBtn) closeBtn.addEventListener('click', () => this.closeModal());
      if (cancelBtn) cancelBtn.addEventListener('click', () => this.closeModal());
    },

    getFilteredData() {
      const search = (document.getElementById('appSearchInput')?.value || '').toLowerCase().trim();
      const status = document.getElementById('appStatusFilter')?.value || 'ALL';
      const type = document.getElementById('appTypeFilter')?.value || 'ALL';
      const sort = document.getElementById('appSortFilter')?.value || 'newest';

      let result = [...applications];

      // Search Filter
      if (search) {
        result = result.filter(a =>
          a.company.toLowerCase().includes(search) ||
          a.role.toLowerCase().includes(search) ||
          (a.notes && a.notes.toLowerCase().includes(search))
        );
      }

      // Status Filter
      if (status !== 'ALL') {
        result = result.filter(a => a.status === status);
      }

      // Job Type Filter
      if (type !== 'ALL') {
        result = result.filter(a => a.jobType === type);
      }

      // Sorting
      result.sort((a, b) => {
        if (sort === 'newest') {
          return new Date(b.date) - new Date(a.date);
        } else if (sort === 'oldest') {
          return new Date(a.date) - new Date(b.date);
        } else if (sort === 'company-asc') {
          return a.company.localeCompare(b.company);
        } else if (sort === 'company-desc') {
          return b.company.localeCompare(a.company);
        }
        return 0;
      });

      return result;
    },

    render() {
      const data = this.getFilteredData();
      const tbody = document.getElementById('applicationsTableBody');
      const mobileContainer = document.getElementById('mobileAppsContainer');
      const emptyState = document.getElementById('appsEmptyState');
      const tableCard = document.querySelector('.app-table-card .table-responsive');

      if (!tbody) return;

      tbody.innerHTML = '';
      if (mobileContainer) mobileContainer.innerHTML = '';

      if (data.length === 0) {
        if (emptyState) emptyState.style.display = 'flex';
        if (tableCard) tableCard.style.display = 'none';
        return;
      }

      if (emptyState) emptyState.style.display = 'none';
      if (tableCard) tableCard.style.display = 'block';

      data.forEach(app => {
        const badgeClass = this.getStatusBadgeClass(app.status);
        const initial = app.company.charAt(0).toUpperCase();

        // 1. Desktop Table Row
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>
            <div class="table-company-cell">
              <div class="company-logo-avatar">${initial}</div>
              <div>
                <strong class="list-company-name">${this.escape(app.company)}</strong>
              </div>
            </div>
          </td>
          <td>
            <div>${this.escape(app.role)}</div>
            <small class="text-dim" style="font-size: 11px;">${this.escape(app.jobType)}</small>
          </td>
          <td><span class="text-muted">${this.escape(app.location)}</span></td>
          <td><span class="text-muted">${this.formatDate(app.date)}</span></td>
          <td>
            ${app.deadline ? `<span class="badge badge-outline"><i class="fa-regular fa-clock"></i> ${this.formatDate(app.deadline)}</span>` : '<span class="text-dim">—</span>'}
          </td>
          <td><span class="badge ${badgeClass}">${this.escape(app.status)}</span></td>
          <td>
            <div style="display: flex; gap: 8px; align-items: center;">
              ${app.url ? `<a href="${this.escape(app.url)}" target="_blank" class="action-btn-sm" title="View Job Link"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>` : ''}
              ${app.notes ? `<span class="action-btn-sm" title="${this.escape(app.notes)}"><i class="fa-regular fa-note-sticky"></i></span>` : ''}
            </div>
          </td>
          <td class="text-right">
            <div class="table-actions">
              <button class="action-btn-sm edit-app-btn" data-id="${app.id}" title="Edit Application">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button class="action-btn-sm delete-btn delete-app-btn" data-id="${app.id}" title="Delete Application">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </td>
        `;
        tbody.appendChild(tr);

        // 2. Mobile Card Row
        if (mobileContainer) {
          const card = document.createElement('div');
          card.className = 'app-card-mobile';
          card.innerHTML = `
            <div class="app-card-mobile-header">
              <div style="display: flex; align-items: center; gap: 10px;">
                <div class="company-logo-avatar" style="width: 32px; height: 32px; font-size: 13px;">${initial}</div>
                <div>
                  <h4 style="font-size: 14px; font-weight: 700;">${this.escape(app.company)}</h4>
                  <p style="font-size: 12px; color: var(--text-muted);">${this.escape(app.role)}</p>
                </div>
              </div>
              <span class="badge ${badgeClass}">${this.escape(app.status)}</span>
            </div>
            <div style="font-size: 12px; color: var(--text-muted); display: flex; flex-direction: column; gap: 4px; margin-bottom: 12px;">
              <div><i class="fa-solid fa-location-dot" style="width: 14px;"></i> ${this.escape(app.location)} (${this.escape(app.jobType)})</div>
              <div><i class="fa-regular fa-calendar" style="width: 14px;"></i> Applied: ${this.formatDate(app.date)}</div>
              ${app.deadline ? `<div><i class="fa-regular fa-clock" style="width: 14px;"></i> Deadline: ${this.formatDate(app.deadline)}</div>` : ''}
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 10px;">
              <div>
                ${app.url ? `<a href="${this.escape(app.url)}" target="_blank" class="btn-text" style="font-size: 12px;"><i class="fa-solid fa-link"></i> Job Link</a>` : ''}
              </div>
              <div style="display: flex; gap: 8px;">
                <button class="action-btn-sm edit-app-btn" data-id="${app.id}"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="action-btn-sm delete-btn delete-app-btn" data-id="${app.id}"><i class="fa-solid fa-trash-can"></i></button>
              </div>
            </div>
          `;
          mobileContainer.appendChild(card);
        }
      });

      // Bind edit and delete handlers
      document.querySelectorAll('.edit-app-btn').forEach(b => {
        b.addEventListener('click', () => {
          const id = b.getAttribute('data-id');
          this.openModal(id);
        });
      });

      document.querySelectorAll('.delete-app-btn').forEach(b => {
        b.addEventListener('click', () => {
          const id = b.getAttribute('data-id');
          this.promptDelete(id);
        });
      });

      // Update badge counts in sidebar
      this.updateSidebarCounters();
    },

    openModal(id = null) {
      const modal = document.getElementById('appModal');
      const title = document.getElementById('appModalTitle');
      const form = document.getElementById('appForm');

      this.clearErrors();

      if (id) {
        const app = applications.find(a => a.id === id);
        if (!app) return;
        title.textContent = 'Edit Application';
        document.getElementById('appId').value = app.id;
        document.getElementById('appCompany').value = app.company;
        document.getElementById('appRole').value = app.role;
        document.getElementById('appLocation').value = app.location;
        document.getElementById('appJobType').value = app.jobType;
        document.getElementById('appDate').value = app.date;
        document.getElementById('appDeadline').value = app.deadline || '';
        document.getElementById('appStatus').value = app.status;
        document.getElementById('appUrl').value = app.url || '';
        document.getElementById('appNotes').value = app.notes || '';
      } else {
        title.textContent = 'Add New Application';
        form.reset();
        document.getElementById('appId').value = '';
        // Set today's date by default
        const todayStr = new Date().toISOString().split('T')[0];
        document.getElementById('appDate').value = todayStr;
      }

      modal.classList.add('show');
    },

    closeModal() {
      const modal = document.getElementById('appModal');
      if (modal) modal.classList.remove('show');
      this.clearErrors();
    },

    handleSubmit() {
      const id = document.getElementById('appId').value;
      const company = document.getElementById('appCompany').value.trim();
      const role = document.getElementById('appRole').value.trim();
      const location = document.getElementById('appLocation').value.trim();
      const jobType = document.getElementById('appJobType').value;
      const date = document.getElementById('appDate').value;
      const deadline = document.getElementById('appDeadline').value;
      const status = document.getElementById('appStatus').value;
      const url = document.getElementById('appUrl').value.trim();
      const notes = document.getElementById('appNotes').value.trim();

      // Form validation
      let isValid = true;
      this.clearErrors();

      if (!company) {
        this.showError('errCompany', 'appCompany');
        isValid = false;
      }
      if (!role) {
        this.showError('errRole', 'appRole');
        isValid = false;
      }
      if (!location) {
        this.showError('errLocation', 'appLocation');
        isValid = false;
      }
      if (!date) {
        this.showError('errDate', 'appDate');
        isValid = false;
      }
      if (url && !this.isValidUrl(url)) {
        this.showError('errUrl', 'appUrl');
        isValid = false;
      }

      if (!isValid) return;

      if (id) {
        // Edit existing
        const index = applications.findIndex(a => a.id === id);
        if (index !== -1) {
          applications[index] = {
            id,
            company,
            role,
            location,
            jobType,
            date,
            deadline,
            status,
            url,
            notes
          };
          showToast(`Application for ${company} updated!`, 'success');
        }
      } else {
        // Create new
        const newApp = {
          id: 'app_' + Date.now(),
          company,
          role,
          location,
          jobType,
          date,
          deadline,
          status,
          url,
          notes
        };
        applications.unshift(newApp);
        showToast(`Application for ${company} added!`, 'success');
      }

      Store.saveApplications(applications);
      this.closeModal();
      this.render();
      Dashboard.refresh();
      Calendar.render();
      Analytics.render();
    },

    promptDelete(id) {
      const app = applications.find(a => a.id === id);
      if (!app) return;

      deleteTarget = { type: 'app', id };
      const msg = `Are you sure you want to delete the application for "${app.company} - ${app.role}"?`;
      Modals.openConfirm('Delete Application', msg, () => {
        applications = applications.filter(a => a.id !== id);
        Store.saveApplications(applications);
        showToast('Application deleted successfully.', 'info');
        Applications.render();
        Dashboard.refresh();
        Calendar.render();
        Analytics.render();
      });
    },

    clearErrors() {
      document.querySelectorAll('.form-error').forEach(el => el.classList.remove('visible'));
      document.querySelectorAll('.form-control').forEach(el => el.classList.remove('is-invalid'));
    },

    showError(errorId, inputId) {
      const err = document.getElementById(errorId);
      const input = document.getElementById(inputId);
      if (err) err.classList.add('visible');
      if (input) input.classList.add('is-invalid');
    },

    isValidUrl(string) {
      try {
        new URL(string);
        return true;
      } catch (_) {
        return false;
      }
    },

    getStatusBadgeClass(status) {
      switch (status) {
        case 'Applied': return 'badge-info';
        case 'Assessment': return 'badge-warning';
        case 'Interview': return 'badge-primary';
        case 'Offer': return 'badge-success';
        case 'Rejected': return 'badge-danger';
        default: return 'badge-neutral';
      }
    },

    updateSidebarCounters() {
      const navAppCount = document.getElementById('navAppCount');
      if (navAppCount) {
        navAppCount.textContent = applications.length;
      }
    },

    formatDate(dateStr) {
      if (!dateStr) return '';
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    },

    escape(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }
  };

  // --------------------------------------------------------------------------
  // 6. Interviews Module (CRUD, Upcoming / Completed Tabs)
  // --------------------------------------------------------------------------
  const Interviews = {
    init() {
      // Tab navigation
      const tabs = document.querySelectorAll('#interviewTabs .filter-tab');
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          tabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          activeInterviewTab = tab.getAttribute('data-tab');
          this.render();
        });
      });

      // Add Interview Modal triggers
      const openBtns = [
        document.getElementById('openAddInterviewModalBtn'),
        document.getElementById('emptyAddInterviewBtn'),
        document.getElementById('calQuickAddInterviewBtn')
      ];

      openBtns.forEach(b => {
        if (b) {
          b.addEventListener('click', () => {
            // If triggered from calendar agenda, pass selected date
            const prefillDate = (b.id === 'calQuickAddInterviewBtn') ? selectedCalendarDateStr : null;
            this.openModal(null, prefillDate);
          });
        }
      });

      // Modal Form Submit
      const form = document.getElementById('interviewForm');
      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          this.handleSubmit();
        });
      }

      // Close & Cancel
      const closeBtn = document.getElementById('closeInterviewModalBtn');
      const cancelBtn = document.getElementById('cancelInterviewBtn');
      if (closeBtn) closeBtn.addEventListener('click', () => this.closeModal());
      if (cancelBtn) cancelBtn.addEventListener('click', () => this.closeModal());
    },

    render() {
      const grid = document.getElementById('interviewsGrid');
      const emptyState = document.getElementById('interviewsEmptyState');
      if (!grid) return;

      grid.innerHTML = '';

      let list = [...interviews];
      if (activeInterviewTab === 'upcoming') {
        list = list.filter(i => i.status === 'Upcoming');
      } else if (activeInterviewTab === 'completed') {
        list = list.filter(i => i.status === 'Completed');
      }

      // Sort by date ascending for upcoming
      list.sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));

      if (list.length === 0) {
        if (emptyState) emptyState.style.display = 'flex';
        return;
      }

      if (emptyState) emptyState.style.display = 'none';

      list.forEach(item => {
        const isUpcoming = item.status === 'Upcoming';
        const card = document.createElement('div');
        card.className = `interview-card ${isUpcoming ? '' : 'completed'}`;

        card.innerHTML = `
          <div>
            <div class="interview-card-header">
              <div>
                <h4 class="interview-company">${Applications.escape(item.company)}</h4>
                <p class="interview-position">${Applications.escape(item.role)}</p>
              </div>
              <span class="badge ${isUpcoming ? 'badge-primary' : 'badge-success'}">
                <i class="fa-solid ${isUpcoming ? 'fa-clock' : 'fa-circle-check'}"></i> ${item.status}
              </span>
            </div>

            <div class="interview-details-list" style="margin-top: 14px;">
              <div class="interview-detail-item">
                <i class="fa-regular fa-calendar-days"></i>
                <span>${Applications.formatDate(item.date)} at <strong>${item.time}</strong></span>
              </div>
              <div class="interview-detail-item">
                <i class="fa-solid fa-layer-group"></i>
                <span>${Applications.escape(item.round)}</span>
              </div>
              <div class="interview-detail-item">
                <i class="fa-solid ${item.mode === 'Online' ? 'fa-video' : 'fa-building'}"></i>
                <span>${Applications.escape(item.mode)}: ${item.linkLocation ? Applications.escape(item.linkLocation) : 'Location TBA'}</span>
              </div>
            </div>

            ${item.notes ? `
              <div class="interview-notes-box" style="margin-top: 12px;">
                <i class="fa-solid fa-lightbulb" style="color: var(--status-assessment); margin-right: 4px;"></i>
                ${Applications.escape(item.notes)}
              </div>
            ` : ''}
          </div>

          <div class="interview-card-footer">
            <div>
              ${isUpcoming ? `
                <button class="btn btn-outline btn-sm toggle-status-btn" data-id="${item.id}">
                  <i class="fa-solid fa-check"></i> Mark Completed
                </button>
              ` : `
                <span class="text-dim" style="font-size: 11px;"><i class="fa-solid fa-circle-check text-offer"></i> Done</span>
              `}
            </div>
            <div style="display: flex; gap: 6px;">
              <button class="action-btn-sm edit-int-btn" data-id="${item.id}" title="Edit Interview">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button class="action-btn-sm delete-btn delete-int-btn" data-id="${item.id}" title="Delete Interview">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </div>
        `;

        grid.appendChild(card);
      });

      // Actions
      document.querySelectorAll('.edit-int-btn').forEach(b => {
        b.addEventListener('click', () => {
          const id = b.getAttribute('data-id');
          this.openModal(id);
        });
      });

      document.querySelectorAll('.delete-int-btn').forEach(b => {
        b.addEventListener('click', () => {
          const id = b.getAttribute('data-id');
          this.promptDelete(id);
        });
      });

      document.querySelectorAll('.toggle-status-btn').forEach(b => {
        b.addEventListener('click', () => {
          const id = b.getAttribute('data-id');
          this.markCompleted(id);
        });
      });

      this.updateSidebarCounters();
    },

    openModal(id = null, prefillDate = null) {
      const modal = document.getElementById('interviewModal');
      const title = document.getElementById('interviewModalTitle');
      const form = document.getElementById('interviewForm');

      this.clearErrors();

      if (id) {
        const item = interviews.find(i => i.id === id);
        if (!item) return;
        title.textContent = 'Edit Interview Round';
        document.getElementById('interviewId').value = item.id;
        document.getElementById('interviewCompany').value = item.company;
        document.getElementById('interviewRole').value = item.role;
        document.getElementById('interviewDate').value = item.date;
        document.getElementById('interviewTime').value = item.time;
        document.getElementById('interviewRound').value = item.round;
        document.getElementById('interviewMode').value = item.mode;
        document.getElementById('interviewLinkLocation').value = item.linkLocation || '';
        document.getElementById('interviewStatus').value = item.status;
        document.getElementById('interviewNotes').value = item.notes || '';
      } else {
        title.textContent = 'Schedule Interview Round';
        form.reset();
        document.getElementById('interviewId').value = '';
        document.getElementById('interviewDate').value = prefillDate || new Date().toISOString().split('T')[0];
        document.getElementById('interviewTime').value = '10:00';
        document.getElementById('interviewStatus').value = 'Upcoming';
      }

      modal.classList.add('show');
    },

    closeModal() {
      const modal = document.getElementById('interviewModal');
      if (modal) modal.classList.remove('show');
      this.clearErrors();
    },

    handleSubmit() {
      const id = document.getElementById('interviewId').value;
      const company = document.getElementById('interviewCompany').value.trim();
      const role = document.getElementById('interviewRole').value.trim();
      const date = document.getElementById('interviewDate').value;
      const time = document.getElementById('interviewTime').value;
      const round = document.getElementById('interviewRound').value;
      const mode = document.getElementById('interviewMode').value;
      const linkLocation = document.getElementById('interviewLinkLocation').value.trim();
      const status = document.getElementById('interviewStatus').value;
      const notes = document.getElementById('interviewNotes').value.trim();

      let isValid = true;
      this.clearErrors();

      if (!company) {
        this.showError('errIntCompany', 'interviewCompany');
        isValid = false;
      }
      if (!role) {
        this.showError('errIntRole', 'interviewRole');
        isValid = false;
      }
      if (!date) {
        this.showError('errIntDate', 'interviewDate');
        isValid = false;
      }
      if (!time) {
        this.showError('errIntTime', 'interviewTime');
        isValid = false;
      }

      if (!isValid) return;

      if (id) {
        const index = interviews.findIndex(i => i.id === id);
        if (index !== -1) {
          interviews[index] = {
            id,
            company,
            role,
            date,
            time,
            round,
            mode,
            linkLocation,
            status,
            notes
          };
          showToast(`Interview with ${company} updated!`, 'success');
        }
      } else {
        const newItem = {
          id: 'int_' + Date.now(),
          company,
          role,
          date,
          time,
          round,
          mode,
          linkLocation,
          status,
          notes
        };
        interviews.unshift(newItem);
        showToast(`Interview for ${company} scheduled!`, 'success');
      }

      Store.saveInterviews(interviews);
      this.closeModal();
      this.render();
      Dashboard.refresh();
      Calendar.render();
      Analytics.render();
    },

    markCompleted(id) {
      const item = interviews.find(i => i.id === id);
      if (item) {
        item.status = 'Completed';
        Store.saveInterviews(interviews);
        showToast(`Interview with ${item.company} marked as completed!`, 'success');
        this.render();
        Dashboard.refresh();
        Calendar.render();
      }
    },

    promptDelete(id) {
      const item = interviews.find(i => i.id === id);
      if (!item) return;

      Modals.openConfirm('Delete Interview', `Are you sure you want to remove the interview round for "${item.company}"?`, () => {
        interviews = interviews.filter(i => i.id !== id);
        Store.saveInterviews(interviews);
        showToast('Interview deleted.', 'info');
        Interviews.render();
        Dashboard.refresh();
        Calendar.render();
        Analytics.render();
      });
    },

    updateSidebarCounters() {
      const countEl = document.getElementById('navInterviewCount');
      if (countEl) {
        const upcomingCount = interviews.filter(i => i.status === 'Upcoming').length;
        countEl.textContent = upcomingCount;
      }
    },

    clearErrors() {
      ['errIntCompany', 'errIntRole', 'errIntDate', 'errIntTime'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('visible');
      });
      ['interviewCompany', 'interviewRole', 'interviewDate', 'interviewTime'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('is-invalid');
      });
    },

    showError(errId, inputId) {
      const err = document.getElementById(errId);
      const input = document.getElementById(inputId);
      if (err) err.classList.add('visible');
      if (input) input.classList.add('is-invalid');
    }
  };

  // --------------------------------------------------------------------------
  // 7. Calendar Module (Monthly Grid, Event Matching & Agenda Drawer)
  // --------------------------------------------------------------------------
  const Calendar = {
    init() {
      const prevBtn = document.getElementById('calPrevMonth');
      const nextBtn = document.getElementById('calNextMonth');
      const todayBtn = document.getElementById('calTodayBtn');

      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
          this.render();
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
          this.render();
        });
      }

      if (todayBtn) {
        todayBtn.addEventListener('click', () => {
          currentCalendarDate = new Date();
          const yr = currentCalendarDate.getFullYear();
          const mo = String(currentCalendarDate.getMonth() + 1).padStart(2, '0');
          const dy = String(currentCalendarDate.getDate()).padStart(2, '0');
          selectedCalendarDateStr = `${yr}-${mo}-${dy}`;
          this.render();
        });
      }
    },

    render() {
      const grid = document.getElementById('calendarGrid');
      const title = document.getElementById('calendarMonthTitle');
      if (!grid || !title) return;

      const year = currentCalendarDate.getFullYear();
      const month = currentCalendarDate.getMonth();

      // Set Title
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      title.textContent = `${monthNames[month]} ${year}`;

      grid.innerHTML = '';

      // First day of month and total days
      const firstDayIndex = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const prevMonthDays = new Date(year, month, 0).getDate();

      const today = new Date();
      const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

      // 1. Previous month trailing days
      for (let i = firstDayIndex - 1; i >= 0; i--) {
        const dayNum = prevMonthDays - i;
        const cell = document.createElement('div');
        cell.className = 'cal-day other-month';
        cell.innerHTML = `<span class="cal-day-num">${dayNum}</span>`;
        grid.appendChild(cell);
      }

      // 2. Current month days
      for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayEvents = this.getEventsForDate(dateStr);

        const cell = document.createElement('div');
        cell.className = 'cal-day';
        if (dateStr === todayStr) cell.classList.add('today');
        if (dateStr === selectedCalendarDateStr) cell.classList.add('selected');

        let dotsHtml = '';
        if (dayEvents.interviews.length > 0) {
          dotsHtml += '<span class="cal-event-pill dot-interview" title="Interview"></span>';
        }
        if (dayEvents.assessments.length > 0) {
          dotsHtml += '<span class="cal-event-pill dot-assessment" title="Assessment"></span>';
        }
        if (dayEvents.deadlines.length > 0) {
          dotsHtml += '<span class="cal-event-pill dot-deadline" title="Deadline"></span>';
        }

        cell.innerHTML = `
          <span class="cal-day-num">${day}</span>
          <div class="cal-day-events">${dotsHtml}</div>
        `;

        cell.addEventListener('click', () => {
          selectedCalendarDateStr = dateStr;
          document.querySelectorAll('.cal-day').forEach(c => c.classList.remove('selected'));
          cell.classList.add('selected');
          this.renderAgenda(dateStr, dayEvents);
        });

        grid.appendChild(cell);
      }

      // 3. Next month leading days to complete grid to multiple of 7
      const totalCellsSoFar = firstDayIndex + daysInMonth;
      const remaining = (7 - (totalCellsSoFar % 7)) % 7;
      for (let i = 1; i <= remaining; i++) {
        const cell = document.createElement('div');
        cell.className = 'cal-day other-month';
        cell.innerHTML = `<span class="cal-day-num">${i}</span>`;
        grid.appendChild(cell);
      }

      // Render the agenda drawer for currently selected date
      const selectedEvents = this.getEventsForDate(selectedCalendarDateStr);
      this.renderAgenda(selectedCalendarDateStr, selectedEvents);
    },

    getEventsForDate(dateStr) {
      const dayInterviews = interviews.filter(i => i.date === dateStr);
      const dayDeadlines = applications.filter(a => a.deadline === dateStr);
      const dayAssessments = applications.filter(a => a.status === 'Assessment' && a.deadline === dateStr);

      return {
        interviews: dayInterviews,
        deadlines: dayDeadlines,
        assessments: dayAssessments
      };
    },

    renderAgenda(dateStr, events) {
      const agendaTitle = document.getElementById('selectedDateTitle');
      const agendaList = document.getElementById('agendaEventsList');
      if (!agendaTitle || !agendaList) return;

      const dateObj = new Date(dateStr);
      const formatted = isNaN(dateObj.getTime())
        ? dateStr
        : dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });

      agendaTitle.textContent = formatted;
      agendaList.innerHTML = '';

      const total = events.interviews.length + events.deadlines.length;

      if (total === 0) {
        agendaList.innerHTML = `
          <div class="agenda-empty">
            <i class="fa-regular fa-calendar-check"></i>
            <p>No deadlines or interviews logged for this date.</p>
          </div>
        `;
        return;
      }

      // Interviews
      events.interviews.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = 'agenda-item interview';
        itemEl.innerHTML = `
          <div class="agenda-item-header">
            <span><i class="fa-solid fa-user-tie"></i> ${Applications.escape(item.company)}</span>
            <span class="badge badge-primary">${item.time}</span>
          </div>
          <p class="agenda-item-desc">${Applications.escape(item.round)} (${item.mode})</p>
          ${item.linkLocation ? `<small class="text-dim">${Applications.escape(item.linkLocation)}</small>` : ''}
        `;
        agendaList.appendChild(itemEl);
      });

      // Deadlines
      events.deadlines.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = `agenda-item ${item.status === 'Assessment' ? 'assessment' : 'deadline'}`;
        itemEl.innerHTML = `
          <div class="agenda-item-header">
            <span><i class="fa-solid fa-hourglass-end"></i> ${Applications.escape(item.company)}</span>
            <span class="badge ${Applications.getStatusBadgeClass(item.status)}">${item.status}</span>
          </div>
          <p class="agenda-item-desc">Application Deadline for ${Applications.escape(item.role)}</p>
        `;
        agendaList.appendChild(itemEl);
      });
    }
  };

  // --------------------------------------------------------------------------
  // 8. Analytics Module (Calculations & Funnel Visualization)
  // --------------------------------------------------------------------------
  const Analytics = {
    render() {
      const total = applications.length;

      const interviewsCount = applications.filter(a => a.status === 'Interview' || a.status === 'Offer').length;
      const offersCount = applications.filter(a => a.status === 'Offer').length;
      const rejectionsCount = applications.filter(a => a.status === 'Rejected').length;
      const activeCount = applications.filter(a => a.status === 'Applied' || a.status === 'Assessment' || a.status === 'Interview').length;

      const interviewRate = total > 0 ? Math.round((interviewsCount / total) * 100) : 0;
      const offerRate = total > 0 ? Math.round((offersCount / total) * 100) : 0;
      const rejectRate = total > 0 ? Math.round((rejectionsCount / total) * 100) : 0;

      // Update KPI widgets
      const intRateEl = document.getElementById('metricInterviewRate');
      const offerRateEl = document.getElementById('metricOfferRate');
      const activeEl = document.getElementById('metricActiveCount');
      const rejectRateEl = document.getElementById('metricRejectRate');

      if (intRateEl) intRateEl.textContent = `${interviewRate}%`;
      if (offerRateEl) offerRateEl.textContent = `${offerRate}%`;
      if (activeEl) activeEl.textContent = activeCount;
      if (rejectRateEl) rejectRateEl.textContent = `${rejectRate}%`;

      // Status Funnel Breakdown
      const funnelContainer = document.getElementById('analyticsFunnelContainer');
      if (funnelContainer) {
        const statuses = [
          { name: 'Applied', color: 'var(--status-applied)' },
          { name: 'Assessment', color: 'var(--status-assessment)' },
          { name: 'Interview', color: 'var(--status-interview)' },
          { name: 'Offer', color: 'var(--status-offer)' },
          { name: 'Rejected', color: 'var(--status-rejected)' }
        ];

        funnelContainer.innerHTML = '';
        statuses.forEach(s => {
          const count = applications.filter(a => a.status === s.name).length;
          const pct = total > 0 ? Math.round((count / total) * 100) : 0;

          const row = document.createElement('div');
          row.className = 'funnel-item';
          row.innerHTML = `
            <div class="funnel-meta">
              <span>${s.name} (${count})</span>
              <span>${pct}%</span>
            </div>
            <div class="funnel-bar-bg">
              <div class="funnel-bar-fill" style="width: ${pct}%; background-color: ${s.color};"></div>
            </div>
          `;
          funnelContainer.appendChild(row);
        });
      }

      // Target Roles Frequency Distribution
      const roleListContainer = document.getElementById('analyticsRoleList');
      if (roleListContainer) {
        const roleMap = {};
        applications.forEach(a => {
          const r = a.role.trim();
          roleMap[r] = (roleMap[r] || 0) + 1;
        });

        const sortedRoles = Object.entries(roleMap).sort((a, b) => b[1] - a[1]).slice(0, 5);

        roleListContainer.innerHTML = '';
        if (sortedRoles.length === 0) {
          roleListContainer.innerHTML = '<p class="text-dim text-center py-4">No role data available yet.</p>';
        } else {
          sortedRoles.forEach(([roleName, count]) => {
            const item = document.createElement('div');
            item.className = 'role-item';
            item.innerHTML = `
              <span class="role-name">${Applications.escape(roleName)}</span>
              <span class="role-badge">${count} ${count === 1 ? 'application' : 'applications'}</span>
            `;
            roleListContainer.appendChild(item);
          });
        }
      }

      // Render velocity chart
      Charts.renderVelocityChart();
    }
  };

  // --------------------------------------------------------------------------
  // 9. Charts Engine (Lightweight Vanilla Canvas Charts without heavy libraries)
  // --------------------------------------------------------------------------
  const Charts = {
    renderDashboardCharts() {
      this.renderActivityChart();
      this.renderStatusDonutChart();
    },

    // A. Application Activity Over Time (Responsive Canvas Line / Area Chart)
    renderActivityChart() {
      const canvas = document.getElementById('activityChartCanvas');
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement.getBoundingClientRect();
      const width = rect.width || 500;
      const height = 220;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.scale(dpr, dpr);

      // Prepare Monthly buckets (Last 6 months)
      const months = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];
      const counts = [1, 2, 3, 5, 8, 4]; // Sample/Dynamic trends

      // Check real applications months
      const realMonthCounts = { '06': 0, '07': 0, '08': 0, '09': 0, '10': 0, '11': 0 };
      applications.forEach(a => {
        if (a.date) {
          const m = a.date.split('-')[1];
          if (realMonthCounts[m] !== undefined) {
            realMonthCounts[m]++;
          }
        }
      });

      const dataPoints = [
        realMonthCounts['06'] || 1,
        realMonthCounts['07'] || 2,
        realMonthCounts['08'] || 2,
        realMonthCounts['09'] || 4,
        realMonthCounts['10'] || 7,
        realMonthCounts['11'] || 3
      ];

      const maxVal = Math.max(...dataPoints, 8);
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const textColor = isDark ? '#94A3B8' : '#697586';
      const gridColor = isDark ? 'rgba(255, 255, 255, 0.08)' : '#E5E9EF';
      const lineColor = isDark ? '#6B8FB5' : '#50749B';

      ctx.clearRect(0, 0, width, height);

      const paddingLeft = 36;
      const paddingRight = 20;
      const paddingTop = 20;
      const paddingBottom = 30;

      const chartW = width - paddingLeft - paddingRight;
      const chartH = height - paddingTop - paddingBottom;

      // Draw Grid Lines
      ctx.lineWidth = 1;
      ctx.strokeStyle = gridColor;
      ctx.fillStyle = textColor;
      ctx.font = '11px sans-serif';

      const gridRows = 4;
      for (let i = 0; i <= gridRows; i++) {
        const y = paddingTop + (chartH / gridRows) * i;
        ctx.beginPath();
        ctx.moveTo(paddingLeft, y);
        ctx.lineTo(width - paddingRight, y);
        ctx.stroke();

        const val = Math.round(maxVal - (maxVal / gridRows) * i);
        ctx.fillText(val, 8, y + 4);
      }

      // Compute coordinate points
      const points = dataPoints.map((val, idx) => {
        const x = paddingLeft + (chartW / (dataPoints.length - 1)) * idx;
        const y = paddingTop + chartH - (val / maxVal) * chartH;
        return { x, y, label: months[idx], val };
      });

      // Draw Gradient Area
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.lineTo(points[points.length - 1].x, paddingTop + chartH);
      ctx.lineTo(points[0].x, paddingTop + chartH);
      ctx.closePath();

      const gradient = ctx.createLinearGradient(0, paddingTop, 0, paddingTop + chartH);
      gradient.addColorStop(0, isDark ? 'rgba(107, 143, 181, 0.22)' : 'rgba(80, 116, 155, 0.18)');
      gradient.addColorStop(1, 'rgba(80, 116, 155, 0.0)');
      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw Line
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = lineColor;
      ctx.stroke();

      // Draw Nodes & Labels
      points.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = lineColor;
        ctx.stroke();

        // X Axis labels
        ctx.fillStyle = textColor;
        ctx.fillText(p.label, p.x - 10, height - 8);
      });
    },

    // B. Status Distribution Donut Chart
    renderStatusDonutChart() {
      const canvas = document.getElementById('statusChartCanvas');
      const legendEl = document.getElementById('statusOverviewLegend');
      if (!canvas || !legendEl) return;

      const ctx = canvas.getContext('2d');
      const dpr = window.devicePixelRatio || 1;
      const size = 180;

      canvas.width = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width = size + 'px';
      canvas.style.height = size + 'px';
      ctx.scale(dpr, dpr);

      const statusConfig = [
        { name: 'Applied', color: '#50749B' },
        { name: 'Assessment', color: '#B78335' },
        { name: 'Interview', color: '#7265A8' },
        { name: 'Offer', color: '#368568' },
        { name: 'Rejected', color: '#C45C62' }
      ];

      const counts = statusConfig.map(s => {
        return {
          ...s,
          count: applications.filter(a => a.status === s.name).length
        };
      });

      const total = counts.reduce((acc, curr) => acc + curr.count, 0);

      ctx.clearRect(0, 0, size, size);

      const centerX = size / 2;
      const centerY = size / 2;
      const outerRadius = 75;
      const innerRadius = 48;

      let startAngle = -Math.PI / 2;

      if (total === 0) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, outerRadius, 0, Math.PI * 2);
        ctx.arc(centerX, centerY, innerRadius, Math.PI * 2, 0, true);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fill();
      } else {
        counts.forEach(segment => {
          if (segment.count === 0) return;
          const sliceAngle = (segment.count / total) * (Math.PI * 2);
          const endAngle = startAngle + sliceAngle;

          ctx.beginPath();
          ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle);
          ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true);
          ctx.closePath();
          ctx.fillStyle = segment.color;
          ctx.fill();

          startAngle = endAngle;
        });
      }

      // Center text
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      ctx.fillStyle = isDark ? '#F1F5F9' : '#202B3C';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText(total, centerX, centerY - 6);

      ctx.fillStyle = isDark ? '#94A3B8' : '#697586';
      ctx.font = '11px sans-serif';
      ctx.fillText('Applications', centerX, centerY + 14);

      // Render Dynamic Legend
      legendEl.innerHTML = '';
      counts.forEach(s => {
        const pct = total > 0 ? Math.round((s.count / total) * 100) : 0;
        const row = document.createElement('div');
        row.className = 'legend-row';
        row.innerHTML = `
          <div class="legend-color-label">
            <span class="legend-swatch" style="background-color: ${s.color};"></span>
            <span>${s.name}</span>
          </div>
          <span class="legend-count">${s.count} <small class="text-dim" style="font-weight: normal;">(${pct}%)</small></span>
        `;
        legendEl.appendChild(row);
      });
    },

    // C. Monthly Velocity Bar Chart (Analytics Section)
    renderVelocityChart() {
      const canvas = document.getElementById('monthlyVelocityCanvas');
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement.getBoundingClientRect();
      const width = rect.width || 800;
      const height = 260;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.scale(dpr, dpr);

      const months = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const counts = [1, 2, 4, 3, 6, 9, applications.length, 0];

      const maxVal = Math.max(...counts, 10);
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const textColor = isDark ? '#94A3B8' : '#697586';
      const gridColor = isDark ? 'rgba(255, 255, 255, 0.08)' : '#E5E9EF';

      ctx.clearRect(0, 0, width, height);

      const paddingLeft = 40;
      const paddingRight = 20;
      const paddingTop = 20;
      const paddingBottom = 30;

      const chartW = width - paddingLeft - paddingRight;
      const chartH = height - paddingTop - paddingBottom;

      // Draw Grid
      ctx.lineWidth = 1;
      ctx.strokeStyle = gridColor;
      ctx.fillStyle = textColor;
      ctx.font = '11px sans-serif';

      const gridRows = 4;
      for (let i = 0; i <= gridRows; i++) {
        const y = paddingTop + (chartH / gridRows) * i;
        ctx.beginPath();
        ctx.moveTo(paddingLeft, y);
        ctx.lineTo(width - paddingRight, y);
        ctx.stroke();

        const val = Math.round(maxVal - (maxVal / gridRows) * i);
        ctx.fillText(val, 10, y + 4);
      }

      // Draw Bars
      const barWidth = Math.min(36, chartW / months.length - 16);
      const step = chartW / months.length;

      counts.forEach((val, idx) => {
        const x = paddingLeft + idx * step + (step - barWidth) / 2;
        const barH = (val / maxVal) * chartH;
        const y = paddingTop + chartH - barH;

        // Bar fill
        const barGradient = ctx.createLinearGradient(0, y, 0, y + barH);
        barGradient.addColorStop(0, isDark ? '#6B8FB5' : '#50749B');
        barGradient.addColorStop(1, isDark ? '#3F6289' : '#253A56');
        ctx.fillStyle = barGradient;

        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barH, [4, 4, 0, 0]);
        ctx.fill();

        // Label
        ctx.fillStyle = textColor;
        ctx.textAlign = 'center';
        ctx.fillText(months[idx], x + barWidth / 2, height - 8);

        // Value on top of bar
        if (val > 0) {
          ctx.fillStyle = isDark ? '#F1F5F9' : '#202B3C';
          ctx.font = 'bold 11px sans-serif';
          ctx.fillText(val, x + barWidth / 2, y - 6);
        }
      });
    }
  };

  // --------------------------------------------------------------------------
  // 10. Dashboard Module (KPI Cards, Greetings, Activity Feed)
  // --------------------------------------------------------------------------
  const Dashboard = {
    init() {
      // Date badge display
      this.updateDateAndGreeting();
    },

    updateDateAndGreeting() {
      const now = new Date();
      const options = { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' };
      const dateEl = document.getElementById('currentDateDisplay');
      if (dateEl) {
        dateEl.textContent = now.toLocaleDateString('en-US', options);
      }

      const hour = now.getHours();
      let greeting = 'Good morning';
      if (hour >= 12 && hour < 17) greeting = 'Good afternoon';
      else if (hour >= 17) greeting = 'Good evening';

      const greetingEl = document.getElementById('welcomeGreeting');
      if (greetingEl) {
        const firstName = userProfile.name ? userProfile.name.split(' ')[0] : 'Candidate';
        greetingEl.textContent = `${greeting}, ${firstName}!`;
      }
    },

    refresh() {
      this.updateDateAndGreeting();

      // 1. Update 6 Statistics Cards
      const total = applications.length;
      const applied = applications.filter(a => a.status === 'Applied').length;
      const assessment = applications.filter(a => a.status === 'Assessment').length;
      const interview = applications.filter(a => a.status === 'Interview').length;
      const offer = applications.filter(a => a.status === 'Offer').length;
      const rejected = applications.filter(a => a.status === 'Rejected').length;

      document.getElementById('statTotal').textContent = total;
      document.getElementById('statApplied').textContent = applied;
      document.getElementById('statAssessment').textContent = assessment;
      document.getElementById('statInterview').textContent = interview;
      document.getElementById('statOffer').textContent = offer;
      document.getElementById('statRejected').textContent = rejected;

      // Update readiness percentage in sidebar
      const progress = total > 0 ? Math.min(100, Math.round(((interview * 2 + offer * 3 + applied) / (total * 2.5)) * 100)) : 20;
      const progressBar = document.getElementById('sidebarProgress');
      const progressLabel = document.getElementById('sidebarProgressLabel');
      if (progressBar) progressBar.style.width = `${progress}%`;
      if (progressLabel) progressLabel.textContent = `Placement Readiness: ${progress}%`;

      // 2. Upcoming Interviews Preview List
      const upcomingListEl = document.getElementById('dashUpcomingInterviewsList');
      if (upcomingListEl) {
        const upcoming = interviews
          .filter(i => i.status === 'Upcoming')
          .sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`))
          .slice(0, 4);

        upcomingListEl.innerHTML = '';
        if (upcoming.length === 0) {
          upcomingListEl.innerHTML = '<p class="text-dim text-center py-4" style="padding: 24px;">No upcoming interviews scheduled.</p>';
        } else {
          upcoming.forEach(item => {
            const row = document.createElement('div');
            row.className = 'list-item';
            row.innerHTML = `
              <div class="list-left">
                <div class="company-logo-avatar">${item.company.charAt(0)}</div>
                <div>
                  <span class="list-company-name">${Applications.escape(item.company)}</span>
                  <span class="list-role-title">${Applications.escape(item.round)}</span>
                </div>
              </div>
              <div class="list-right">
                <div class="list-date-info">
                  <strong>${Applications.formatDate(item.date)}</strong>
                  <div>${item.time} (${item.mode})</div>
                </div>
                <span class="badge badge-primary"><i class="fa-regular fa-clock"></i> Scheduled</span>
              </div>
            `;
            upcomingListEl.appendChild(row);
          });
        }
      }

      // 3. Recent Applications Preview List
      const recentListEl = document.getElementById('dashRecentAppsList');
      if (recentListEl) {
        const recent = [...applications]
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 4);

        recentListEl.innerHTML = '';
        if (recent.length === 0) {
          recentListEl.innerHTML = '<p class="text-dim text-center py-4" style="padding: 24px;">No applications added yet.</p>';
        } else {
          recent.forEach(app => {
            const row = document.createElement('div');
            row.className = 'list-item';
            row.innerHTML = `
              <div class="list-left">
                <div class="company-logo-avatar">${app.company.charAt(0)}</div>
                <div>
                  <span class="list-company-name">${Applications.escape(app.company)}</span>
                  <span class="list-role-title">${Applications.escape(app.role)}</span>
                </div>
              </div>
              <div class="list-right">
                <div class="list-date-info">${Applications.formatDate(app.date)}</div>
                <span class="badge ${Applications.getStatusBadgeClass(app.status)}">${app.status}</span>
              </div>
            `;
            recentListEl.appendChild(row);
          });
        }
      }

      // 4. Redraw Canvas Charts
      Charts.renderDashboardCharts();
    }
  };

  // --------------------------------------------------------------------------
  // 11. Settings Module (User Profile, Reset Demo Records, Notification bell)
  // --------------------------------------------------------------------------
  const Settings = {
    init() {
      // Profile form load
      const form = document.getElementById('profileSettingsForm');
      if (form) {
        document.getElementById('settingsName').value = userProfile.name || '';
        document.getElementById('settingsEmail').value = userProfile.email || '';
        document.getElementById('settingsTargetRole').value = userProfile.targetRole || '';
        document.getElementById('settingsUniversity').value = userProfile.university || '';

        form.addEventListener('submit', (e) => {
          e.preventDefault();
          userProfile.name = document.getElementById('settingsName').value.trim();
          userProfile.email = document.getElementById('settingsEmail').value.trim();
          userProfile.targetRole = document.getElementById('settingsTargetRole').value.trim();
          userProfile.university = document.getElementById('settingsUniversity').value.trim();

          Store.saveProfile(userProfile);
          this.applyProfileUI();
          showToast('Profile updated successfully!', 'success');
          Dashboard.updateDateAndGreeting();
        });
      }

      this.applyProfileUI();

      // Reset Demo Data
      const resetBtn = document.getElementById('loadDemoDataBtn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          Modals.openConfirm('Reset Demo Data', 'This will restore sample placement records for testing and demonstration.', () => {
            Store.resetAllToDemo();
            applications = Store.getApplications();
            interviews = Store.getInterviews();
            userProfile = Store.getProfile();
            showToast('Demo data restored!', 'success');
            Applications.render();
            Interviews.render();
            Dashboard.refresh();
            Calendar.render();
            Analytics.render();
            this.applyProfileUI();
          });
        });
      }

      // Clear All Data
      const clearBtn = document.getElementById('clearAllDataBtn');
      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          Modals.openConfirm('Wipe All Records', 'Are you sure you want to completely erase all applications and interviews? This cannot be undone.', () => {
            Store.clearAll();
            applications = [];
            interviews = [];
            showToast('All placement records cleared.', 'info');
            Applications.render();
            Interviews.render();
            Dashboard.refresh();
            Calendar.render();
            Analytics.render();
          });
        });
      }

      // Notifications Dropdown Mockup
      const notifBtn = document.getElementById('notificationBtn');
      const notifMenu = document.getElementById('notificationMenu');
      const clearNotifs = document.getElementById('clearNotifsBtn');

      if (notifBtn && notifMenu) {
        notifBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          notifMenu.classList.toggle('show');
        });

        document.addEventListener('click', (e) => {
          if (!notifMenu.contains(e.target) && !notifBtn.contains(e.target)) {
            notifMenu.classList.remove('show');
          }
        });
      }

      if (clearNotifs) {
        clearNotifs.addEventListener('click', () => {
          const badge = document.getElementById('notificationCount');
          const headerBadge = document.getElementById('notifBadgeCount');
          if (badge) badge.style.display = 'none';
          if (headerBadge) headerBadge.textContent = '0 New';
          document.querySelectorAll('.notification-item').forEach(i => i.classList.remove('unread'));
          showToast('All notifications marked as read', 'info');
        });
      }
    },

    applyProfileUI() {
      const topName = document.getElementById('topUserName');
      const topRole = document.getElementById('topUserRole');
      const topAvatar = document.getElementById('topAvatar');

      if (topName) topName.textContent = userProfile.name || 'Candidate';
      if (topRole) topRole.textContent = userProfile.targetRole || 'Software Candidate';
      if (topAvatar && userProfile.name) {
        const initials = userProfile.name
          .split(' ')
          .map(w => w.charAt(0))
          .join('')
          .toUpperCase()
          .slice(0, 2);
        topAvatar.textContent = initials || 'CT';
      }
    }
  };

  // --------------------------------------------------------------------------
  // 12. Modal & Confirmation Manager
  // --------------------------------------------------------------------------
  let confirmCallback = null;

  const Modals = {
    init() {
      const confirmModal = document.getElementById('confirmModal');
      const cancelBtn = document.getElementById('cancelConfirmBtn');
      const closeBtn = document.getElementById('closeConfirmModalBtn');
      const acceptBtn = document.getElementById('acceptConfirmBtn');

      const closeHandler = () => {
        if (confirmModal) confirmModal.classList.remove('show');
        confirmCallback = null;
      };

      if (cancelBtn) cancelBtn.addEventListener('click', closeHandler);
      if (closeBtn) closeBtn.addEventListener('click', closeHandler);

      if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
          if (typeof confirmCallback === 'function') {
            confirmCallback();
          }
          closeHandler();
        });
      }

      // Close modals on Esc key
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          Applications.closeModal();
          Interviews.closeModal();
          closeHandler();
        }
      });
    },

    openConfirm(title, message, onAccept) {
      const modal = document.getElementById('confirmModal');
      const titleEl = document.getElementById('confirmModalTitle');
      const msgEl = document.getElementById('confirmModalMessage');

      if (titleEl) titleEl.textContent = title;
      if (msgEl) msgEl.textContent = message;

      confirmCallback = onAccept;
      if (modal) modal.classList.add('show');
    }
  };

  // --------------------------------------------------------------------------
  // 13. Toast Notification Helper
  // --------------------------------------------------------------------------
  function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let icon = 'fa-info-circle';
    if (type === 'success') icon = 'fa-circle-check';
    else if (type === 'error') icon = 'fa-circle-xmark';

    toast.innerHTML = `
      <i class="fa-solid ${icon} toast-icon"></i>
      <span>${Applications.escape(message)}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-hiding');
      setTimeout(() => {
        if (toast.parentElement) toast.parentElement.removeChild(toast);
      }, 300);
    }, 3200);
  }

  // --------------------------------------------------------------------------
  // 14. Global Initialization
  // --------------------------------------------------------------------------
  window.addEventListener('DOMContentLoaded', () => {
    // 1. Hydrate state from localStorage
    applications = Store.getApplications();
    interviews = Store.getInterviews();
    userProfile = Store.getProfile();

    // 2. Initialize UI modules
    Theme.init();
    Navigation.init();
    Applications.init();
    Interviews.init();
    Calendar.init();
    Modals.init();
    Settings.init();
    Dashboard.init();

    // 3. Render Initial Views
    Dashboard.refresh();
    Applications.render();
    Interviews.render();
    Calendar.render();
    Analytics.render();

    // Handle Window Resize for Canvas Charts
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        Charts.renderDashboardCharts();
        Charts.renderVelocityChart();
      }, 200);
    });
  });

})();
