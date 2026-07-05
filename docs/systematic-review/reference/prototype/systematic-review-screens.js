(() => {
  MananOS.screen('systematic-review', {
    title: 'Systematic Review',
    crumbs: ['Projects', 'SGLT2i in HFpEF', 'Review cockpit'],
    states: MananOS.ui.states,
    render(state, { h, ic, toast, helpers }) {
      // FIX (a): pass 'systematic-review' as screenId so scenarioCopy resolves correctly
      const notice = MananOS.ui.stateNotice(state, 'systematic-review', 'systematic-review');
      const phases = ['Setup', 'Search', 'Screen', 'Assess', 'Analyze', 'Report'];

      // PRISMA header — FIX (e): zero counts in true empty state
      const prismaValues = state === 'empty'
        ? [['0', 'Identified'], ['0', 'After dedupe'], ['0', 'Full text'], ['0', 'Included']]
        : [['1,284', 'Identified'], ['1,032', 'After dedupe'], ['212', 'Full text'], ['18', 'Included']];

      const prisma = h('div', { class: 'prisma-flow' },
        ...prismaValues.map(([value, label], i) => h('div', { class: 'prisma-node' },
          h('b', {}, value),
          h('span', {}, label),
          i < 3 ? h('i', { class: 'ph ph-arrow-right' }) : null)));

      // --- FIX (b): Elicit per-criterion Yes/Maybe/No chip grid ---
      // Shared extraction column model — visually consistent with Summary-of-findings
      const extractionCriteria = [
        'Population (HFpEF criteria)',
        'Intervention (SGLT2i type/dose)',
        'Comparator',
        'Primary outcome',
        'Effect estimate',
        'Risk of bias',
      ];
      const screeningDecisions = {
        'EMPEROR-Preserved': { 'Population (HFpEF criteria)': 'yes', 'Intervention (SGLT2i type/dose)': 'yes', 'Comparator': 'yes', 'Primary outcome': 'yes', 'Effect estimate': 'yes', 'Risk of bias': 'yes' },
        'DELIVER': { 'Population (HFpEF criteria)': 'yes', 'Intervention (SGLT2i type/dose)': 'yes', 'Comparator': 'yes', 'Primary outcome': 'yes', 'Effect estimate': 'yes', 'Risk of bias': 'maybe' },
        'Registry update': { 'Population (HFpEF criteria)': 'yes', 'Intervention (SGLT2i type/dose)': 'yes', 'Comparator': 'no', 'Primary outcome': 'maybe', 'Effect estimate': 'no', 'Risk of bias': 'maybe' },
      };
      const studies = Object.keys(screeningDecisions);

      const chipClass = (decision) => {
        if (decision === 'yes') return 'chip on';
        if (decision === 'maybe') return 'chip';
        return 'chip muted';
      };
      const chipLabel = (decision) => {
        if (decision === 'yes') return 'Yes';
        if (decision === 'maybe') return 'Maybe';
        return 'No';
      };

      const elicitGrid = h('div', { class: 'col-stack gap2' },
        h('div', { class: 'row wrap gap2 mb2' },
          h('div', { class: 'card-title' }, 'Screening — per-criterion grid'),
          h('div', { class: 'spacer' }),
          // FIX (b): "Add screening/extraction columns" panel affordance
          h('button', {
            class: 'btn btn-sm btn-secondary',
            onclick: () => toast('Add columns: describe what to extract (shared with Summary of findings)', 'plus'),
          }, ic('plus'), 'Add screening/extraction columns')),
        h('div', { class: 'table-wrap' },
          h('table', { class: 'data-table' },
            h('thead', {},
              h('tr', {},
                h('th', {}, 'Study'),
                ...extractionCriteria.map(c => h('th', {}, c)),
                h('th', {}, 'Decision'))),
            h('tbody', {},
              ...studies.map(study =>
                h('tr', {},
                  h('td', {}, study),
                  ...extractionCriteria.map(criterion => {
                    const decision = screeningDecisions[study][criterion] || 'no';
                    return h('td', {},
                      h('span', {
                        class: chipClass(decision),
                        onclick: () => toast(`${study} · ${criterion}: toggled`, 'check-square'),
                        style: { cursor: 'pointer' },
                      }, chipLabel(decision)));
                  }),
                  h('td', {},
                    h('span', {
                      class: studies.indexOf(study) < 2 ? 'badge verified' : 'badge concern',
                    }, studies.indexOf(study) < 2 ? 'Include' : 'Exclude'))))))));

      // --- FIX (c): phase sub-tabs that actually swap the active sub-panel ---
      // Track active sub-tab via a simple mutable ref on the node
      const subTabPanels = {
        'Abstract screening': elicitGrid,
        'Conflicts': h('div', { class: 'surface-band' },
          h('div', { class: 'card-title' }, 'Conflicts'),
          h('div', { class: 'muted mt2' }, 'No unresolved conflicts. Cohen\'s κ = 0.82 after adjudication.'),
          h('div', { class: 'notice mt2' }, ic('check-circle'), h('div', {}, 'All dual-blind decisions reconciled.'))),
        'Risk of bias': h('div', { class: 'surface-band' },
          h('div', { class: 'card-title' }, 'Risk of Bias — RoB 2'),
          h('div', { class: 'muted mt2' }, '3 studies appraised · 2 low risk · 1 some concerns.'),
          MananOS.ui.createTable([
            ['EMPEROR-Preserved', h('span', { class: 'badge verified' }, 'Low'), h('span', { class: 'badge verified' }, 'Low'), h('span', { class: 'badge verified' }, 'Low'), h('span', { class: 'badge verified' }, 'Low'), h('span', { class: 'badge verified' }, 'Low')],
            ['DELIVER', h('span', { class: 'badge verified' }, 'Low'), h('span', { class: 'badge verified' }, 'Low'), h('span', { class: 'badge concern' }, 'Some concerns'), h('span', { class: 'badge verified' }, 'Low'), h('span', { class: 'badge concern' }, 'Some concerns')],
          ])),
        'Extraction': h('div', { class: 'surface-band' },
          h('div', { class: 'row wrap gap2 mb2' },
            h('div', { class: 'card-title' }, 'Data Extraction'),
            h('div', { class: 'spacer' }),
            h('button', {
              class: 'btn btn-sm btn-secondary',
              onclick: () => toast('Add extraction column — shared with Summary of findings', 'plus'),
            }, ic('plus'), 'Add column')),
          MananOS.ui.createTable([
            ['EMPEROR-Preserved', 'HFpEF, EF > 40%', 'CV death or HF hosp.', 'HR 0.79 [0.69–0.90]', h('span', { class: 'badge verified' }, 'High')],
            ['DELIVER', 'HFmrEF/HFpEF', 'Worsening HF or CV death', 'HR 0.82 [0.73–0.92]', h('span', { class: 'badge verified' }, 'High')],
          ])),
        'Audit': h('div', { class: 'surface-band' },
          h('div', { class: 'card-title' }, 'Audit trail'),
          h('div', { class: 'muted mt2' }, 'All screening, conflict-resolution, and extraction decisions are logged.')),
      };

      const subTabNames = Object.keys(subTabPanels);
      const subPanelContainer = h('div', {});
      let activeSubTab = 'Abstract screening';

      const renderSubPanel = () => {
        subPanelContainer.innerHTML = '';
        subPanelContainer.append(subTabPanels[activeSubTab]);
      };

      const subTabBar = h('div', { class: 'toolbar' },
        ...subTabNames.map(name =>
          h('span', {
            class: `chip ${name === activeSubTab ? 'on' : ''}`,
            // FIX (c): clicking actually swaps the sub-panel, not just a toast
            onclick: (e) => {
              activeSubTab = name;
              e.currentTarget.parentElement.querySelectorAll('.chip').forEach(el => el.classList.remove('on'));
              e.currentTarget.classList.add('on');
              renderSubPanel();
            },
          }, name)),
        h('div', { class: 'spacer' }),
        h('button', { class: 'btn btn-sm btn-secondary', onclick: () => toast('Conflict assigned to reviewer 2', 'user-switch') }, ic('user-switch'), 'Assign'));

      renderSubPanel();

      // Phase gate notices
      const phaseGate = state === 'partial'
        ? h('div', { class: 'notice warn' }, ic('warning'), h('div', {}, h('b', {}, 'Stale downstream. '), 'Search changed after extraction. Assess, Analyze, and Report need refresh before export.'))
        : state === 'permission'
          ? h('div', { class: 'notice warn' }, ic('eye-slash'), h('div', {}, h('b', {}, 'Blind role lock. '), 'Reviewer view hides conflict resolution until adjudication.'))
          : state === 'quota'
            ? h('div', { class: 'notice ai' }, ic('coins'), h('div', {}, h('b', {}, 'AI screening paused. '), 'Manual include/exclude, conflicts, extraction, and PRISMA tracking remain available.'))
            : null;

      // FIX (d): offline and error branch content
      if (state === 'offline') {
        const offlineMain = h('div', { class: 'col-stack gap4' },
          h('div', { class: 'notice info' },
            ic('wifi-slash'),
            h('div', {},
              h('b', {}, 'Offline screening mode. '),
              'Include/Exclude/Maybe decisions are queued locally and will sync when you reconnect. Stats and meta-analysis are blocked.')),
          prisma,
          h('div', { class: 'surface-band' },
            h('div', { class: 'card-title mb2' }, 'Queued offline decisions'),
            h('div', { class: 'muted' }, '3 decisions pending sync'),
            h('div', { class: 'row wrap gap2 mt2' },
              h('span', { class: 'badge concern' }, 'Sync pending'))));
        return MananOS.ui.workbench({ title: 'Review cockpit', kind: 'Review', meta: 'Offline — screening queued', notice, main: offlineMain });
      }

      if (state === 'error') {
        const errorMain = h('div', { class: 'col-stack gap4' },
          h('div', { class: 'notice error' },
            ic('warning-octagon'),
            h('div', {},
              h('b', {}, 'Screening job failed — resuming from last checkpoint. '),
              h('div', { class: 'muted mt2' }, '47 of 212 abstracts screened before interruption. All decisions up to record 47 are preserved.'),
              h('div', { class: 'row wrap gap2 mt2' },
                h('button', { class: 'btn btn-sm btn-primary', onclick: () => toast('Resuming from record 47', 'play') }, ic('play'), 'Resume from record 47'),
                h('button', { class: 'btn btn-sm btn-secondary', onclick: () => toast('Manual screening mode — no AI assist', 'user') }, ic('user'), 'Continue manually')))),
          prisma,
          subTabBar,
          subPanelContainer);
        return MananOS.ui.workbench({ title: 'Review cockpit', kind: 'Review', meta: 'Interrupted · 47/212 screened · checkpoint saved', notice, main: errorMain });
      }

      // FIX (d): end state — "All abstracts screened → resolve N conflicts →"
      if (state === 'end') {
        const endMain = h('div', { class: 'col-stack gap4' },
          h('div', { class: 'notice' },
            ic('flag-checkered'),
            h('div', {},
              h('b', {}, 'All 1,032 abstracts screened. '),
              h('div', { class: 'muted mt2' }, '212 advanced to full text · 3 conflicts to resolve before extraction.'),
              h('div', { class: 'row wrap gap2 mt2' },
                h('button', { class: 'btn btn-sm btn-primary', onclick: () => toast('Opening Conflicts sub-tab', 'arrows-counter-clockwise') }, ic('arrows-counter-clockwise'), 'Resolve 3 conflicts'),
                h('button', { class: 'btn btn-sm btn-secondary', onclick: () => toast('Advancing to Assess phase', 'arrow-right') }, ic('arrow-right'), 'Advance to Assess →')))),
          prisma,
          h('div', { class: 'phase-stepper' },
            ...phases.map((p, i) => h('div', { class: `phase-step ${i === 2 ? 'active' : ''}` },
              h('div', { class: 'num' }, `0${i + 1}`),
              h('div', { class: 'card-title' }, p),
              h('div', { class: 'muted' }, i <= 2 ? 'Complete' : 'Queued')))));
        return MananOS.ui.workbench({ title: 'Review cockpit', kind: 'Review', meta: 'Screening complete · 3 conflicts', notice, main: endMain });
      }

      // --- loading ---
      if (state === 'loading') {
        return MananOS.ui.workbench({ title: 'Review cockpit', kind: 'Review', meta: 'Loading PRISMA state', notice, main: helpers.skeletonList(5) });
      }

      // --- main composite layout (empty, partial, permission, quota, default) ---
      const miniStatsValues = state === 'empty'
        ? [['0', 'Records'], ['0', 'Full text'], ['0', 'Included'], ['—', 'Kappa']]
        : [['1,284', 'Records'], ['212', 'Full text'], ['18', 'Included'], ['0.82', 'Kappa']];

      const main = h('div', { class: 'col-stack gap4' },
        h('div', { class: 'surface-band' },
          h('div', { class: 'row wrap' },
            MananOS.ui.miniStats(miniStatsValues),
            h('div', { class: 'spacer' }),
            h('button', { class: 'btn btn-secondary', onclick: () => toast('Blind screening enabled', 'eye-slash') }, ic('eye-slash'), 'Blind roles'),
            h('button', { class: 'btn btn-secondary', onclick: () => toast('Cost estimate: 84 credits', 'coins') }, ic('coins'), 'Estimate'),
            h('button', { class: 'btn btn-primary', onclick: () => toast('Screening resumed', 'play') }, ic('play'), 'Resume'))),
        prisma,
        h('div', { class: 'phase-stepper' },
          ...phases.map((p, i) => h('div', {
            class: `phase-step ${i === 2 ? 'active' : ''}`,
            onclick: () => {
              const available = i <= 2 || (state !== 'empty');
              if (!available) {
                toast(`Complete prior phases to unlock ${p}`, 'lock');
              } else {
                toast(`${p} phase selected`, 'list-checks');
              }
            },
          },
            h('div', { class: 'num' }, `0${i + 1}`),
            h('div', { class: 'card-title' }, p),
            h('div', { class: 'muted' }, i < 2 ? 'Complete' : i === 2 ? 'Active' : i > 3 && state === 'partial' ? 'Stale' : state === 'empty' ? '🔒 Gated' : 'Queued')))),
        phaseGate,
        // FIX (e): keep stale-downstream partial behavior; show authGate only in true empty
        state === 'empty' ? MananOS.ui.authGate('Save review protocol', 'Save protocol') : null,
        subTabBar,
        subPanelContainer);

      return MananOS.ui.workbench({
        title: 'Review cockpit',
        kind: 'Review',
        meta: 'PRISMA · Setup/Search/Screen/Assess/Analyze/Report · audit safe',
        notice,
        main,
      });
    },
  });
})();
