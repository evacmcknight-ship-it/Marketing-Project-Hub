const STORAGE_KEY = "marketing-initiative-dashboard-v4";
const REQUESTS_STORAGE_KEY = "marketing-request-catalog-v1";
const GOALS_STORAGE_KEY = "marketing-goals-rich-text-v1";
const API_BASE = "/.netlify/functions";
const SHARED_REFRESH_INTERVAL_MS = 60000;

const OWNERS = ["Eva", "Neal", "Kelly"];
const CHANNELS = ["Inbound", "Outbound", "Events", "Referrals"];
const TYPE_OPTIONS = [
  "Strategic Initiative",
  "Event",
  "Social Posts",
  "Website Only",
  "Blog Posts",
  "Ebooks/Guides",
  "Webinars",
  "Video",
  "Case Studies",
  "Other Sales Collateral",
];
const SOCIAL_TYPE = "Social Posts";
const WORKSPACE_VIEWS = ["roadmap", "calendar", "social", "goals", "requests"];
const CONTENT_TYPES = TYPE_OPTIONS.filter(
  (type) => !["Strategic Initiative", "Event", SOCIAL_TYPE].includes(type)
);
const GOALS_CONTENT = {
  intro:
    "2026 is about clarifying who Mesh is, what we stand for, and why we win … and then executing consistently enough to convert that clarity into new business deals.",
  strategicThemes: [
    "Establish a clear, credible Mesh brand.",
    "Ensure a unified Mesh narrative anchored in MeshInsights and IoT 2.0 across events, campaigns, outbound, partner motions, and sales conversations.",
    "Diversify and scale demand generation.",
    "Build multiple, repeatable demand engines that reduce dependence on any singular channel.",
    "Operationalize marketing for scale.",
    "Build the people, processes, and playbooks required to execute consistently as new deal volume increases.",
  ],
  smartGoals: [
    {
      title: "Generate 175 new business deals by December 31, 2026.",
      children: [
        "Reach at least 90 new business deals by June 30, 2026.",
        "Increase new business close rate to 9%, up from 5.7% in 2025.",
      ],
    },
    {
      title: "Establish new brand messaging and positioning to reflect the Mesh 2.0 posture.",
      children: [
        "New pitch deck flow by February 28, 2026.",
        "New brand messaging documentation and brand guidelines by April 30, 2026.",
        "New website and P1 brand assets updated by June 30, 2026.",
      ],
    },
    {
      title: "Hire and onboard a Growth Marketing Manager by March 31, 2026.",
    },
    {
      title: "Deliver an updated Marketing Center of Excellence Playbook/SOP by June 30, 2026.",
    },
  ],
};

const STATUS_CONFIG = {
  Planned: { color: "var(--planned)", width: "30%" },
  "In Progress": { color: "var(--progress)", width: "65%" },
  "At Risk": { color: "var(--risk)", width: "85%" },
  Complete: { color: "var(--complete)", width: "100%" },
};

const QUARTER_MONTHS = {
  Q1: ["January", "February", "March"],
  Q2: ["April", "May", "June"],
  Q3: ["July", "August", "September"],
  Q4: ["October", "November", "December"],
};

const OWNER_MIGRATION = {
  Maya: "Neal",
  Jordan: "Eva",
  Priya: "Kelly",
  Sofia: "Eva",
  Alex: "Neal",
  Danielle: "Kelly",
};

const defaultInitiatives = [
  {
    id: createId(),
    name: "CES 2026",
    type: "Event",
    channels: ["Events"],
    owner: "Kelly",
    quarter: "Q1 2026",
    status: "Complete",
    startDate: "2026-01-06",
    endDate: "2026-01-08",
    deadline: "2026-01-08",
    description: "CES event execution from January 6-8 in Las Vegas, marked complete in the GTM plan.",
  },
  {
    id: createId(),
    name: "AHR 2026",
    type: "Event",
    channels: ["Events"],
    owner: "Kelly",
    quarter: "Q1 2026",
    status: "Complete",
    startDate: "2026-02-02",
    endDate: "2026-02-04",
    deadline: "2026-02-04",
    description: "AHR trade show execution from February 2-4 in Las Vegas, marked complete in the GTM plan.",
  },
  {
    id: createId(),
    name: "ConExpo 2026",
    type: "Event",
    channels: ["Events"],
    owner: "Kelly",
    quarter: "Q1 2026",
    status: "Complete",
    startDate: "2026-03-03",
    endDate: "2026-03-05",
    deadline: "2026-03-05",
    description: "ConExpo event execution from March 3-5 in Las Vegas, marked complete in the GTM plan.",
  },
  {
    id: createId(),
    name: "MeshInsights Phase One Launch",
    type: "Strategic Initiative",
    channels: ["Inbound", "Outbound"],
    owner: "Eva",
    quarter: "Q1 2026",
    status: "In Progress",
    deadline: "",
    description: "Q1 launch motion covering launch foundation, outbound re-engagement, landing page, paid advertising, and thought leadership tied to MeshInsights.",
  },
  {
    id: createId(),
    name: "Brand Refresh Timing and Scope Decision",
    type: "Strategic Initiative",
    channels: ["Inbound", "Outbound"],
    owner: "Eva",
    quarter: "Q1 2026",
    status: "Complete",
    deadline: "",
    description: "Operational decision on the timing and scope of the brand refresh, marked complete in Q1 tactics.",
  },
  {
    id: createId(),
    name: "Call Recording Software Decision and Implementation",
    type: "Strategic Initiative",
    channels: ["Outbound"],
    owner: "Neal",
    quarter: "Q1 2026",
    status: "Complete",
    deadline: "",
    description: "Selection and implementation of call recording software, marked complete in the Q1 operational needs row.",
  },
  {
    id: createId(),
    name: "Moncur Brand Refresh and Pitch Deck Project",
    type: "Strategic Initiative",
    channels: ["Inbound", "Outbound"],
    owner: "Eva",
    quarter: "Q1 2026",
    status: "Complete",
    deadline: "",
    description: "Brand refresh and pitch deck work with Moncur, shown as started and complete in March.",
  },
  {
    id: createId(),
    name: "Growth Marketing Manager Hire and Onboarding",
    type: "Strategic Initiative",
    channels: ["Inbound", "Outbound"],
    owner: "Eva",
    quarter: "Q1 2026",
    status: "In Progress",
    deadline: "",
    description: "Slide 2 goal to hire and onboard a Growth Marketing Manager by March 31, 2026.",
  },
  {
    id: createId(),
    name: "MeshInsights Deck Training Rubric",
    type: "Other Sales Collateral",
    channels: ["Outbound"],
    owner: "Neal",
    quarter: "Q1 2026",
    status: "Complete",
    deadline: "2026-01-31",
    description: "Sales enablement training asset marked complete in January.",
  },
  {
    id: createId(),
    name: "MeshInsights Asset Deep Dive and Preview",
    type: "Other Sales Collateral",
    channels: ["Outbound"],
    owner: "Neal",
    quarter: "Q1 2026",
    status: "Complete",
    deadline: "2026-01-31",
    description: "Sales enablement preview session for MeshInsights assets, marked complete in January.",
  },
  {
    id: createId(),
    name: "HubSpot to Mosaic Mapping",
    type: "Other Sales Collateral",
    channels: ["Outbound"],
    owner: "Neal",
    quarter: "Q1 2026",
    status: "Complete",
    deadline: "2026-02-29",
    description: "HubSpot to Mosaic mapping work shown as complete in February enablement training.",
  },
  {
    id: createId(),
    name: "Sales Pitch Deck Revision",
    type: "Other Sales Collateral",
    channels: ["Outbound"],
    owner: "Neal",
    quarter: "Q1 2026",
    status: "In Progress",
    deadline: "2026-03-31",
    description: "Pitch deck revision and related training remain active in March based on the Q1 tactics slide.",
  },
  {
    id: createId(),
    name: "Call Tool Training",
    type: "Other Sales Collateral",
    channels: ["Outbound"],
    owner: "Neal",
    quarter: "Q1 2026",
    status: "In Progress",
    deadline: "2026-03-31",
    description: "Call tool training appears in March sales enablement without a completion checkmark.",
  },
  {
    id: createId(),
    name: "Mesh Systems Returns to AHR 2026: Opportunities to Connect Beyond the Expo",
    type: "Blog Posts",
    channels: ["Inbound", "Events"],
    owner: "Eva",
    quarter: "Q1 2026",
    status: "Complete",
    deadline: "2026-01-09",
    description: "Published on the live Mesh Systems blog on January 9, 2026.",
  },
  {
    id: createId(),
    name: "CES 2026 Recap: Five Signals Shaping the Next Era of Connected Products",
    type: "Blog Posts",
    channels: ["Inbound", "Events"],
    owner: "Eva",
    quarter: "Q1 2026",
    status: "Complete",
    deadline: "2026-01-13",
    description: "Published on the live Mesh Systems blog on January 13, 2026.",
  },
  {
    id: createId(),
    name: "The Connected Product Expectation Gap is Widening",
    type: "Blog Posts",
    channels: ["Inbound"],
    owner: "Eva",
    quarter: "Q1 2026",
    status: "Complete",
    deadline: "2026-01-26",
    description: "Published on the live Mesh Systems blog on January 26, 2026.",
  },
  {
    id: createId(),
    name: "Exein and Mesh Systems partner to strengthen embedded cybersecurity for US connected device manufacturers",
    type: "Blog Posts",
    channels: ["Inbound", "Referrals"],
    owner: "Kelly",
    quarter: "Q1 2026",
    status: "Complete",
    deadline: "2026-01-29",
    description: "Published on the live Mesh Systems blog on January 29, 2026.",
  },
  {
    id: createId(),
    name: "What AHR Expo 2026 Revealed About the Future of Connected Products in HVACR",
    type: "Blog Posts",
    channels: ["Inbound", "Events"],
    owner: "Eva",
    quarter: "Q1 2026",
    status: "Complete",
    deadline: "2026-02-05",
    description: "Published on the live Mesh Systems blog on February 5, 2026.",
  },
  {
    id: createId(),
    name: "Mesh Systems Named One of the 2026 Best Places to Work in Indiana for the Fourth Consecutive Year",
    type: "Blog Posts",
    channels: ["Inbound"],
    owner: "Eva",
    quarter: "Q1 2026",
    status: "Complete",
    deadline: "2026-02-17",
    description: "Published on the live Mesh Systems blog on February 17, 2026.",
  },
  {
    id: createId(),
    name: "Where the Signal Layer Breaks Down in Connected Product Operations",
    type: "Blog Posts",
    channels: ["Inbound"],
    owner: "Eva",
    quarter: "Q1 2026",
    status: "Complete",
    deadline: "2026-02-19",
    description: "Published on the live Mesh Systems blog on February 19, 2026.",
  },
  {
    id: createId(),
    name: "Join Mesh Systems at These Industry Shows: Spring 2026",
    type: "Blog Posts",
    channels: ["Inbound", "Events"],
    owner: "Eva",
    quarter: "Q1 2026",
    status: "Complete",
    deadline: "2026-02-25",
    description: "Published on the live Mesh Systems blog on February 25, 2026.",
  },
  {
    id: createId(),
    name: "Alarm Fatigue Is Quietly Undermining Connected Operations",
    type: "Blog Posts",
    channels: ["Inbound"],
    owner: "Eva",
    quarter: "Q1 2026",
    status: "Complete",
    deadline: "2026-03-06",
    description: "Published on the live Mesh Systems blog on March 6, 2026.",
  },
  {
    id: createId(),
    name: "The Last Mile of Connected Product Value",
    type: "Ebooks/Guides",
    channels: ["Inbound"],
    owner: "Eva",
    quarter: "Q1 2026",
    status: "Complete",
    deadline: "2026-02-29",
    description: "Executive-level gated ebook marked complete in February and referenced again in the MeshInsights campaign overview.",
  },
  {
    id: createId(),
    name: "Partner Page (High Level)",
    type: "Website Only",
    channels: ["Inbound", "Referrals"],
    owner: "Kelly",
    quarter: "Q1 2026",
    status: "Complete",
    deadline: "2026-01-31",
    description: "High-level partner page marked complete in January.",
  },
  {
    id: createId(),
    name: "Microsoft Partner Spotlight Page",
    type: "Website Only",
    channels: ["Inbound", "Referrals"],
    owner: "Kelly",
    quarter: "Q1 2026",
    status: "Complete",
    deadline: "2026-01-31",
    description: "Microsoft partner spotlight page marked complete in January.",
  },
  {
    id: createId(),
    name: "MeshInsights Advertising Landing Page and Ads",
    type: "Website Only",
    channels: ["Inbound", "Outbound"],
    owner: "Eva",
    quarter: "Q1 2026",
    status: "Complete",
    deadline: "2026-01-31",
    description: "MeshInsights advertising landing page and ads marked complete in January.",
  },
  {
    id: createId(),
    name: "Exein Partner Spotlight Page",
    type: "Website Only",
    channels: ["Inbound", "Referrals"],
    owner: "Kelly",
    quarter: "Q1 2026",
    status: "Complete",
    deadline: "2026-02-29",
    description: "Exein partner spotlight page marked complete in February.",
  },
  {
    id: createId(),
    name: "STMicro Partner Spotlight Page",
    type: "Website Only",
    channels: ["Inbound", "Referrals"],
    owner: "Kelly",
    quarter: "Q1 2026",
    status: "In Progress",
    deadline: "2026-03-31",
    description: "STMicro partner spotlight page is listed in March without a completion checkmark.",
  },
  {
    id: createId(),
    name: "MeshInsights Explainer Video",
    type: "Video",
    channels: ["Inbound", "Outbound"],
    owner: "Eva",
    quarter: "Q1 2026",
    status: "In Progress",
    deadline: "2026-03-31",
    description: "Explainer video is listed in March content and in the MeshInsights campaign overview without a completion checkmark.",
  },
  {
    id: createId(),
    name: "Q1 Case Study Pack",
    type: "Case Studies",
    channels: ["Inbound", "Outbound"],
    owner: "Eva",
    quarter: "Q1 2026",
    status: "In Progress",
    deadline: "2026-03-31",
    description: "Case study work for Eaton 2.0, F'real, and American Crane is listed in March without completion checkmarks.",
  },
  {
    id: createId(),
    name: "Microsoft Quarterly Newsletter and Win Wire",
    type: "Other Sales Collateral",
    channels: ["Outbound", "Referrals"],
    owner: "Kelly",
    quarter: "Q1 2026",
    status: "In Progress",
    deadline: "2026-03-31",
    description: "MSFT quarterly newsletter and win wire are listed in March partner spotlights without completion marks.",
  },
  {
    id: createId(),
    name: "Webinar and Ebook Promo: The Next Mile of Connected Product ROI",
    type: "Strategic Initiative",
    channels: ["Inbound", "Outbound"],
    owner: "Eva",
    quarter: "Q2 2026",
    status: "Planned",
    deadline: "",
    description: "Q2 campaign listed for April around webinar and ebook promotion tied to connected product ROI.",
  },
  {
    id: createId(),
    name: "MODEX 2026",
    type: "Event",
    channels: ["Events"],
    owner: "Kelly",
    quarter: "Q2 2026",
    status: "Planned",
    startDate: "2026-04-13",
    endDate: "2026-04-16",
    deadline: "2026-04-16",
    description: "MODEX event scheduled for April 13-16 on the Q2 tactics slide.",
  },
  {
    id: createId(),
    name: "HMI 2026",
    type: "Event",
    channels: ["Events"],
    owner: "Kelly",
    quarter: "Q2 2026",
    status: "Planned",
    startDate: "2026-04-20",
    endDate: "2026-04-24",
    deadline: "2026-04-24",
    description: "HMI event scheduled for April 20-24 on the Q2 tactics slide.",
  },
  {
    id: createId(),
    name: "NRA Show 2026",
    type: "Event",
    channels: ["Events"],
    owner: "Kelly",
    quarter: "Q2 2026",
    status: "Planned",
    startDate: "2026-05-16",
    endDate: "2026-05-19",
    deadline: "2026-05-19",
    description: "NRA Show event scheduled for May 16-19 on the Q2 tactics slide.",
  },
  {
    id: createId(),
    name: "New Mesh Brand Positioning",
    type: "Strategic Initiative",
    channels: ["Inbound", "Outbound"],
    owner: "Eva",
    quarter: "Q2 2026",
    status: "Planned",
    deadline: "",
    description: "Q2 sales enablement and slide 2 goal work to establish the new Mesh brand positioning.",
  },
  {
    id: createId(),
    name: "New Mesh Pitch Deck",
    type: "Other Sales Collateral",
    channels: ["Outbound"],
    owner: "Neal",
    quarter: "Q2 2026",
    status: "Planned",
    deadline: "2026-05-31",
    description: "Q2 sales enablement item for the new Mesh pitch deck.",
  },
  {
    id: createId(),
    name: "Brand Messaging Documentation and Guidelines",
    type: "Strategic Initiative",
    channels: ["Inbound", "Outbound"],
    owner: "Eva",
    quarter: "Q2 2026",
    status: "Planned",
    deadline: "",
    description: "Slide 2 goal to deliver new brand messaging documentation and brand guidelines by April 30, 2026.",
  },
  {
    id: createId(),
    name: "New Website and P1 Brand Assets",
    type: "Website Only",
    channels: ["Inbound"],
    owner: "Eva",
    quarter: "Q2 2026",
    status: "Planned",
    deadline: "2026-06-30",
    description: "Slide 2 goal to update the website and priority-one brand assets by June 30, 2026.",
  },
  {
    id: createId(),
    name: "Marketing Center of Excellence Playbook and SOP",
    type: "Strategic Initiative",
    channels: ["Inbound", "Outbound"],
    owner: "Eva",
    quarter: "Q2 2026",
    status: "Planned",
    deadline: "",
    description: "Slide 2 goal to deliver an updated Marketing Center of Excellence playbook and SOP by June 30, 2026.",
  },
  {
    id: createId(),
    name: "MeshInsights Webinar",
    type: "Webinars",
    channels: ["Inbound", "Events"],
    owner: "Kelly",
    quarter: "Q2 2026",
    status: "Planned",
    deadline: "2026-04-30",
    description: "Q2 content plan includes a MeshInsights webinar in April.",
  },
  {
    id: createId(),
    name: "Exein and DigiCert Webinar",
    type: "Webinars",
    channels: ["Events", "Referrals"],
    owner: "Kelly",
    quarter: "Q2 2026",
    status: "Planned",
    deadline: "2026-06-30",
    description: "Q2 content plan includes an Exein/DigiCert webinar in June.",
  },
  {
    id: createId(),
    name: "F'real Case Study",
    type: "Case Studies",
    channels: ["Inbound"],
    owner: "Eva",
    quarter: "Q2 2026",
    status: "Planned",
    deadline: "2026-04-30",
    description: "Q2 content plan lists a F'real case study in April.",
  },
  {
    id: createId(),
    name: "American Crane Case Study",
    type: "Case Studies",
    channels: ["Inbound"],
    owner: "Eva",
    quarter: "Q2 2026",
    status: "Planned",
    deadline: "2026-05-31",
    description: "Q2 content plan lists an American Crane case study in May.",
  },
];

const state = {
  initiatives: loadInitiatives(),
  requests: loadRequests(),
  goalsHtml: loadGoalsHtml(),
  filters: {
    quarter: "All Quarters",
    channels: [],
    owner: "All Owners",
    status: "All Statuses",
    type: "All Types",
    archive: "active",
  },
  activeView: "roadmap",
  sortMode: "default",
  expandedColumns: {
    roadmap: [],
    calendar: [],
    social: [],
  },
  selectedInitiativeIds: [],
  draggedInitiativeId: null,
  editingId: null,
  convertingRequestId: null,
  sync: {
    mode: "connecting",
    message: "Connecting to shared workspace…",
    canPublishLocalData: false,
    isBusy: false,
  },
};

let goalsSaveTimeout = 0;
let sharedRefreshTimer = 0;

const elements = {
  addButton: document.querySelector("#add-initiative-button"),
  clearFiltersButton: document.querySelector("#clear-filters-button"),
  quarterFilter: document.querySelector("#quarter-filter"),
  channelFilterGroup: document.querySelector("#channel-filter-group"),
  ownerFilter: document.querySelector("#owner-filter"),
  statusFilter: document.querySelector("#status-filter"),
  typeFilter: document.querySelector("#type-filter"),
  archiveFilter: document.querySelector("#archive-filter"),
  snapshotQuarterLabel: document.querySelector("#snapshot-quarter-label"),
  snapshotMetrics: document.querySelector("#snapshot-metrics"),
  statusBreakdown: document.querySelector("#status-breakdown"),
  tabButtons: document.querySelectorAll(".tab-button"),
  sortSelect: document.querySelector("#column-sort"),
  sortControl: document.querySelector("#sort-control"),
  bulkToolbar: document.querySelector("#bulk-toolbar"),
  bulkSelectionCount: document.querySelector("#bulk-selection-count"),
  selectVisibleButton: document.querySelector("#select-visible-button"),
  bulkEditButton: document.querySelector("#bulk-edit-button"),
  archiveSelectedButton: document.querySelector("#archive-selected-button"),
  clearSelectionButton: document.querySelector("#clear-selection-button"),
  syncStatus: document.querySelector("#sync-status"),
  syncStatusText: document.querySelector("#sync-status-text"),
  publishSharedDataButton: document.querySelector("#publish-shared-data-button"),
  roadmapView: document.querySelector("#roadmap-view"),
  calendarView: document.querySelector("#calendar-view"),
  socialView: document.querySelector("#social-view"),
  goalsView: document.querySelector("#goals-view"),
  requestsView: document.querySelector("#requests-view"),
  dialog: document.querySelector("#initiative-dialog"),
  dialogTitle: document.querySelector("#dialog-title"),
  closeDialogButton: document.querySelector("#close-dialog-button"),
  cancelButton: document.querySelector("#cancel-button"),
  initiativeDeadlineField: document.querySelector("#initiative-deadline-field"),
  eventDateFields: document.querySelector("#event-date-fields"),
  openRequestFormButton: document.querySelector("#open-request-form-button"),
  requestDialog: document.querySelector("#request-dialog"),
  requestForm: document.querySelector("#request-form"),
  closeRequestDialogButton: document.querySelector("#close-request-dialog-button"),
  cancelRequestButton: document.querySelector("#cancel-request-button"),
  requestQuarterEditor: document.querySelector("#request-quarter"),
  requestChannelEditorGrid: document.querySelector("#request-channel-options"),
  requestSelectionError: document.querySelector("#request-selection-error"),
  requestDetailsDialog: document.querySelector("#request-details-dialog"),
  requestDetailsTitle: document.querySelector("#request-details-title"),
  requestDetailsChipRow: document.querySelector("#request-details-chip-row"),
  requestDetailsMeta: document.querySelector("#request-details-meta"),
  requestDetailsDescription: document.querySelector("#request-details-description"),
  closeRequestDetailsButton: document.querySelector("#close-request-details-button"),
  requestDetailsCloseButton: document.querySelector("#request-details-close-button"),
  requestConvertButton: document.querySelector("#request-convert-button"),
  requestDeleteButton: document.querySelector("#request-delete-button"),
  detailsDialog: document.querySelector("#details-dialog"),
  detailsTitle: document.querySelector("#details-title"),
  detailsChipRow: document.querySelector("#details-chip-row"),
  detailsMeta: document.querySelector("#details-meta"),
  detailsDescription: document.querySelector("#details-description"),
  closeDetailsButton: document.querySelector("#close-details-button"),
  detailsCloseButton: document.querySelector("#details-close-button"),
  detailsEditButton: document.querySelector("#details-edit-button"),
  initiativeArchiveButton: document.querySelector("#initiative-archive-button"),
  initiativeDeleteButton: document.querySelector("#initiative-delete-button"),
  bulkEditDialog: document.querySelector("#bulk-edit-dialog"),
  bulkEditForm: document.querySelector("#bulk-edit-form"),
  closeBulkEditDialogButton: document.querySelector("#close-bulk-edit-dialog-button"),
  cancelBulkEditButton: document.querySelector("#cancel-bulk-edit-button"),
  bulkOwnerSelect: document.querySelector("#bulk-owner"),
  bulkQuarterSelect: document.querySelector("#bulk-quarter"),
  bulkChannelGrid: document.querySelector("#bulk-channel-options"),
  form: document.querySelector("#initiative-form"),
  typeEditor: document.querySelector("#initiative-type"),
  quarterEditor: document.querySelector("#initiative-quarter"),
  channelEditorGrid: document.querySelector("#initiative-channel-options"),
  channelSelectionError: document.querySelector("#channel-selection-error"),
  cardTemplate: document.querySelector("#initiative-card-template"),
};

initialize().catch((error) => {
  console.error(error);
  showLocalOnlyStatus("Shared workspace unavailable. Changes stay in this browser only.");
  render();
});

async function initialize() {
  bindEvents();
  render();
  startSharedRefreshLoop();
  document.addEventListener("visibilitychange", handleVisibilityChange);
  await hydrateSharedState();
}

function bindEvents() {
  elements.addButton.addEventListener("click", () => openDialog());
  elements.openRequestFormButton.addEventListener("click", openRequestDialog);
  elements.clearFiltersButton.addEventListener("click", clearFilters);
  elements.closeDialogButton.addEventListener("click", closeDialog);
  elements.cancelButton.addEventListener("click", closeDialog);
  elements.closeRequestDialogButton.addEventListener("click", closeRequestDialog);
  elements.cancelRequestButton.addEventListener("click", closeRequestDialog);
  elements.closeRequestDetailsButton.addEventListener("click", closeRequestDetailsDialog);
  elements.requestDetailsCloseButton.addEventListener("click", closeRequestDetailsDialog);
  elements.requestConvertButton.addEventListener("click", handleRequestConvert);
  elements.requestDeleteButton.addEventListener("click", handleRequestDelete);
  elements.closeDetailsButton.addEventListener("click", closeDetailsDialog);
  elements.detailsCloseButton.addEventListener("click", closeDetailsDialog);
  elements.detailsEditButton.addEventListener("click", handleDetailsEdit);
  elements.initiativeArchiveButton.addEventListener("click", handleInitiativeArchiveToggle);
  elements.initiativeDeleteButton.addEventListener("click", handleInitiativeDelete);
  elements.selectVisibleButton.addEventListener("click", selectVisibleInitiatives);
  elements.bulkEditButton.addEventListener("click", openBulkEditDialog);
  elements.archiveSelectedButton.addEventListener("click", handleArchiveSelected);
  elements.clearSelectionButton.addEventListener("click", clearSelectedInitiatives);
  elements.publishSharedDataButton.addEventListener("click", publishLocalDataToShared);
  elements.closeBulkEditDialogButton.addEventListener("click", closeBulkEditDialog);
  elements.cancelBulkEditButton.addEventListener("click", closeBulkEditDialog);

  elements.quarterFilter.addEventListener("change", handleSingleFilterChange);
  elements.ownerFilter.addEventListener("change", handleSingleFilterChange);
  elements.statusFilter.addEventListener("change", handleSingleFilterChange);
  elements.typeFilter.addEventListener("change", handleSingleFilterChange);
  elements.archiveFilter.addEventListener("change", handleSingleFilterChange);
  elements.channelFilterGroup.addEventListener("change", handleChannelFilterChange);
  elements.sortSelect.addEventListener("change", handleSortChange);
  elements.typeEditor.addEventListener("change", handleTypeEditorChange);
  elements.channelEditorGrid.addEventListener("change", () => {
    elements.channelSelectionError.hidden = getSelectedEditorChannels().length > 0;
  });
  elements.requestChannelEditorGrid.addEventListener("change", () => {
    elements.requestSelectionError.hidden = getSelectedRequestChannels().length > 0;
  });

  elements.tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.activeView = button.dataset.view;
      renderViews();
      syncTabs();
    });
  });

  elements.form.addEventListener("submit", handleFormSubmit);
  elements.requestForm.addEventListener("submit", handleRequestFormSubmit);
  elements.bulkEditForm.addEventListener("submit", handleBulkEditSubmit);
}

function render() {
  if (!WORKSPACE_VIEWS.includes(state.activeView)) {
    state.activeView = "roadmap";
  }
  pruneSelectedInitiatives();
  renderSyncStatus();
  populateEditorTypeOptions();
  populateQuarterOptions();
  populateFilterOptions();
  populateChannelFilters();
  populateEditorChannelOptions();
  populateRequestQuarterOptions();
  renderBulkToolbar();
  syncFilters();
  syncSort();
  renderSnapshot();
  renderViews();
  syncTabs();
}

function renderSyncStatus() {
  elements.syncStatus.dataset.state = state.sync.mode;
  elements.syncStatusText.textContent = state.sync.message;
  elements.publishSharedDataButton.hidden = !state.sync.canPublishLocalData;
  elements.publishSharedDataButton.disabled = state.sync.isBusy;
  elements.publishSharedDataButton.textContent =
    state.sync.isBusy && state.sync.canPublishLocalData ? "Publishing..." : "Publish Local Data";
}

function setSyncState(nextState) {
  state.sync = { ...state.sync, ...nextState };
  renderSyncStatus();
}

function isCardWorkspaceView(view = state.activeView) {
  return ["roadmap", "calendar", "social"].includes(view);
}

function renderBulkToolbar() {
  const shouldShowToolbar = isCardWorkspaceView() && state.selectedInitiativeIds.length > 0;
  elements.bulkToolbar.hidden = !shouldShowToolbar;

  const selectedCount = state.selectedInitiativeIds.length;
  const selectedItems = state.initiatives.filter((item) => state.selectedInitiativeIds.includes(item.id));
  const archiveActionLabel =
    selectedItems.length > 0 && selectedItems.every((item) => item.isArchived)
      ? "Restore Selected"
      : "Archive Selected";
  elements.bulkSelectionCount.textContent = `${selectedCount} card${selectedCount === 1 ? "" : "s"} selected`;
  elements.bulkEditButton.disabled = selectedCount === 0;
  elements.archiveSelectedButton.disabled = selectedCount === 0;
  elements.archiveSelectedButton.textContent = archiveActionLabel;
  elements.clearSelectionButton.disabled = selectedCount === 0;
}

function pruneSelectedInitiatives() {
  const validIds = new Set(state.initiatives.map((item) => item.id));
  state.selectedInitiativeIds = state.selectedInitiativeIds.filter((id) => validIds.has(id));
}

function showLocalOnlyStatus(message) {
  setSyncState({
    mode: "offline",
    message,
    canPublishLocalData: false,
    isBusy: false,
  });
}

function showPublishStatus(message, isBusy = false) {
  setSyncState({
    mode: "publish",
    message,
    canPublishLocalData: true,
    isBusy,
  });
}

function setSharedReadyStatus(message = "Shared Workspace is Live") {
  setSyncState({
    mode: "shared",
    message,
    canPublishLocalData: false,
    isBusy: false,
  });
}

function startSharedRefreshLoop() {
  if (sharedRefreshTimer) {
    return;
  }
  sharedRefreshTimer = window.setInterval(() => {
    hydrateSharedState({ background: true });
  }, SHARED_REFRESH_INTERVAL_MS);
}

function handleVisibilityChange() {
  if (!document.hidden) {
    hydrateSharedState({ background: true });
  }
}

function populateEditorTypeOptions() {
  setSelectOptions(elements.typeEditor, TYPE_OPTIONS[0], TYPE_OPTIONS, false);
}

function populateQuarterOptions() {
  const quarters = getAvailableQuarters();
  setSelectOptions(elements.quarterEditor, getFocusedQuarter(state.initiatives), quarters, false);
}

function populateRequestQuarterOptions() {
  const quarters = getAvailableQuarters();
  setSelectOptions(elements.requestQuarterEditor, getFocusedQuarter(state.initiatives), quarters, false);
}

function populateFilterOptions() {
  const quarters = getAvailableQuarters().filter((quarter) => quarter !== "Q4 2025");
  const statuses = ["Planned", "In Progress", "At Risk", "Complete"];

  setSelectOptions(elements.quarterFilter, "All Quarters", quarters, true);
  setSelectOptions(elements.ownerFilter, "All Owners", OWNERS, true);
  setSelectOptions(elements.statusFilter, "All Statuses", statuses, true);
  setSelectOptions(elements.typeFilter, "All Types", TYPE_OPTIONS, true);
}

function populateChannelFilters() {
  elements.channelFilterGroup.replaceChildren(
    ...CHANNELS.map((channel) => createChannelCheckbox(channel, state.filters.channels.includes(channel), "filter"))
  );
}

function populateEditorChannelOptions() {
  const selectedChannels = state.editingId
    ? getInitiativeById(state.editingId).channels
    : getSelectedEditorChannels();

  elements.channelEditorGrid.replaceChildren(
    ...CHANNELS.map((channel) => createChannelCheckbox(channel, selectedChannels.includes(channel), "editor"))
  );
}

function createChannelCheckbox(channel, checked, context) {
  const label = document.createElement("label");
  label.className = context === "filter" ? "channel-filter-pill" : "channel-editor-option";

  const input = document.createElement("input");
  input.type = "checkbox";
  input.value = channel;
  input.checked = checked;
  input.dataset.context = context;
  input.name = context === "filter" ? "filter-channel" : "channels";

  const text = document.createElement("span");
  text.textContent = channel;

  label.append(input, text);
  return label;
}

function syncFilters() {
  elements.quarterFilter.value = state.filters.quarter;
  elements.ownerFilter.value = state.filters.owner;
  elements.statusFilter.value = state.filters.status;
  elements.typeFilter.value = state.filters.type;
  elements.archiveFilter.value = state.filters.archive;
  elements.channelFilterGroup.querySelectorAll('input[type="checkbox"]').forEach((input) => {
    input.checked = state.filters.channels.includes(input.value);
  });
}

function syncSort() {
  elements.sortSelect.value = state.sortMode;
}

function handleSingleFilterChange(event) {
  const { id, value } = event.target;

  if (id === "quarter-filter") {
    state.filters.quarter = value;
  }
  if (id === "owner-filter") {
    state.filters.owner = value;
  }
  if (id === "status-filter") {
    state.filters.status = value;
  }
  if (id === "type-filter") {
    state.filters.type = value;
  }
  if (id === "archive-filter") {
    state.filters.archive = value;
  }

  render();
}

function handleChannelFilterChange() {
  state.filters.channels = getCheckedValues(elements.channelFilterGroup);
  render();
}

function handleSortChange(event) {
  state.sortMode = event.target.value;
  renderViews();
}

function clearFilters() {
  state.filters = {
    quarter: "All Quarters",
    channels: [],
    owner: "All Owners",
    status: "All Statuses",
    type: "All Types",
    archive: "active",
  };
  render();
}

function clearSelectedInitiatives() {
  state.selectedInitiativeIds = [];
  renderViews();
  renderBulkToolbar();
}

function toggleInitiativeSelection(id) {
  if (state.selectedInitiativeIds.includes(id)) {
    state.selectedInitiativeIds = state.selectedInitiativeIds.filter((item) => item !== id);
  } else {
    state.selectedInitiativeIds = [...state.selectedInitiativeIds, id];
  }
  renderViews();
  renderBulkToolbar();
}

function getCurrentViewInitiatives() {
  const filtered = getFilteredInitiatives();

  if (state.activeView === "roadmap") {
    return filtered;
  }

  if (state.activeView === "calendar") {
    const calendarItems = filtered.filter((item) => CONTENT_TYPES.includes(item.type));
    const activeQuarter = getFocusedQuarter(calendarItems);
    return calendarItems.filter((item) => item.quarter === activeQuarter);
  }

  if (state.activeView === "social") {
    const socialItems = filtered.filter((item) => item.type === SOCIAL_TYPE);
    const activeQuarter = getFocusedQuarter(socialItems);
    return socialItems.filter((item) => item.quarter === activeQuarter);
  }

  return [];
}

function selectVisibleInitiatives() {
  state.selectedInitiativeIds = getCurrentViewInitiatives().map((item) => item.id);
  renderViews();
  renderBulkToolbar();
}

function setDraggedInitiative(id) {
  state.draggedInitiativeId = id;
}

function clearDraggedInitiative() {
  state.draggedInitiativeId = null;
}

function openBulkEditDialog() {
  if (state.selectedInitiativeIds.length === 0) {
    return;
  }

  elements.bulkEditForm.reset();
  setSelectOptions(elements.bulkOwnerSelect, "No change", OWNERS, true);
  setSelectOptions(elements.bulkQuarterSelect, "No change", getAvailableQuarters(), true);
  elements.bulkChannelGrid.replaceChildren(
    ...CHANNELS.map((channel) => createChannelCheckbox(channel, false, "bulk"))
  );
  elements.bulkEditDialog.showModal();
}

function closeBulkEditDialog() {
  elements.bulkEditDialog.close();
}

async function handleBulkEditSubmit(event) {
  event.preventDefault();

  const channels = getCheckedValues(elements.bulkChannelGrid);
  const changes = {};
  const owner = elements.bulkOwnerSelect.value;
  const status = elements.bulkEditForm.elements.namedItem("status").value;
  const quarter = elements.bulkQuarterSelect.value;

  if (owner) {
    changes.owner = owner;
  }
  if (status) {
    changes.status = status;
  }
  if (quarter) {
    changes.quarter = quarter;
  }
  if (channels.length > 0) {
    changes.channels = channels;
  }

  if (Object.keys(changes).length === 0) {
    closeBulkEditDialog();
    return;
  }

  const success = await updateInitiativesInBulk(
    state.selectedInitiativeIds,
    changes,
    "Updating selected cards…",
    "Could not bulk edit the selected cards."
  );

  if (success) {
    state.selectedInitiativeIds = [];
    closeBulkEditDialog();
    render();
  }
}

async function handleArchiveSelected() {
  if (state.selectedInitiativeIds.length === 0) {
    return;
  }

  const selectedItems = state.initiatives.filter((item) => state.selectedInitiativeIds.includes(item.id));
  const shouldRestore = selectedItems.length > 0 && selectedItems.every((item) => item.isArchived);
  const actionLabel = shouldRestore ? "Restore" : "Archive";

  if (!window.confirm(`${actionLabel} ${state.selectedInitiativeIds.length} selected cards?`)) {
    return;
  }

  const success = await updateInitiativesInBulk(
    state.selectedInitiativeIds,
    {
      isArchived: !shouldRestore,
      archivedAt: shouldRestore ? "" : new Date().toISOString(),
    },
    `${shouldRestore ? "Restoring" : "Archiving"} selected cards…`,
    `Could not ${shouldRestore ? "restore" : "archive"} the selected cards.`
  );

  if (success) {
    state.selectedInitiativeIds = [];
    render();
  }
}

async function handleArchiveColumn(viewKey, label, items) {
  if (!items.length) {
    return;
  }

  const shouldRestore = items.every((item) => item.isArchived);
  const actionLabel = shouldRestore ? "Restore" : "Archive";

  if (!window.confirm(`${actionLabel} all ${items.length} cards in ${label}?`)) {
    return;
  }

  await updateInitiativesInBulk(
    items.map((item) => item.id),
    {
      isArchived: !shouldRestore,
      archivedAt: shouldRestore ? "" : new Date().toISOString(),
    },
    `${shouldRestore ? "Restoring" : "Archiving"} ${label}…`,
    `Could not ${shouldRestore ? "restore" : "archive"} the cards in ${label}.`
  );
}

function getFilteredInitiatives() {
  return state.initiatives.filter((item) => {
    const quarterMatch = state.filters.quarter === "All Quarters" || item.quarter === state.filters.quarter;
    const channelMatch =
      state.filters.channels.length === 0 ||
      item.channels.some((channel) => state.filters.channels.includes(channel));
    const ownerMatch = state.filters.owner === "All Owners" || item.owner === state.filters.owner;
    const statusMatch = state.filters.status === "All Statuses" || item.status === state.filters.status;
    const typeMatch = state.filters.type === "All Types" || item.type === state.filters.type;
    const archiveMatch =
      state.filters.archive === "all" ||
      (state.filters.archive === "active" && !item.isArchived) ||
      (state.filters.archive === "archived" && item.isArchived);

    return quarterMatch && channelMatch && ownerMatch && statusMatch && typeMatch && archiveMatch;
  });
}

function renderSnapshot() {
  const filtered = getFilteredInitiatives();
  const snapshotScope = state.filters.quarter === "All Quarters" ? "All quarters" : state.filters.quarter;
  elements.snapshotQuarterLabel.textContent = snapshotScope;

  const inProgressCount = filtered.filter((item) => item.status === "In Progress").length;
  const atRiskCount = filtered.filter((item) => item.status === "At Risk").length;
  const completeCount = filtered.filter((item) => item.status === "Complete").length;

  elements.snapshotMetrics.innerHTML = "";
  [
    { label: "Total initiatives", value: filtered.length },
    { label: "Active now", value: inProgressCount + atRiskCount },
    { label: "At risk", value: atRiskCount },
    { label: "Complete", value: completeCount },
  ].forEach((metric) => {
    const card = document.createElement("article");
    card.className = "metric-card";
    card.innerHTML = `
      <span class="metric-label">${metric.label}</span>
      <span class="metric-value">${metric.value}</span>
    `;
    elements.snapshotMetrics.append(card);
  });

  const statusStack = document.createElement("div");
  statusStack.className = "status-stack";
  ["Planned", "In Progress", "At Risk", "Complete"].forEach((status) => {
    const count = filtered.filter((item) => item.status === status).length;
    const chip = document.createElement("div");
    chip.className = "status-chip";
    chip.innerHTML = `
      <div>
        <strong>${status}</strong>
        <small>${count} initiatives</small>
      </div>
      <span class="status-label" style="color:${STATUS_CONFIG[status].color}">${count}</span>
    `;
    statusStack.append(chip);
  });
  elements.statusBreakdown.replaceChildren(statusStack);
}

function renderViews() {
  renderRoadmapView();
  renderCalendarView();
  renderSocialView();
  renderGoalsView();
  renderRequestsView();

  document.querySelectorAll(".view-section").forEach((section) => {
    section.classList.toggle("active", section.id === `${state.activeView}-view`);
  });
}

function renderRoadmapView() {
  const filtered = getFilteredInitiatives().sort(sortByQuarterThenName);
  const quarters = uniqueValues(filtered.map((item) => item.quarter));
  renderCollapsibleColumnView({
    viewKey: "roadmap",
    labels: quarters,
    defaultExpandedLabel: quarters.includes(getCurrentQuarterLabel()) ? getCurrentQuarterLabel() : getFocusedQuarter(state.initiatives),
    getItemsForLabel: (quarter) => filtered.filter((item) => item.quarter === quarter),
    getDropChanges: (item, quarter) => buildQuarterDropChanges(item, quarter),
    countLabel: (count) => `${count} items`,
    emptyViewMessage: "No initiatives match the current filters.",
    emptyColumnMessage: "No initiatives in this column.",
    gridClassName: "roadmap-grid",
    target: elements.roadmapView,
  });
}

function renderCalendarView() {
  const filtered = getFilteredInitiatives().filter((item) => CONTENT_TYPES.includes(item.type));
  const activeQuarter = getFocusedQuarter(filtered);
  const [quarterKey] = activeQuarter.split(" ");
  const baseMonths = QUARTER_MONTHS[quarterKey];

  if (!baseMonths) {
    const grid = document.createElement("div");
    grid.className = "calendar-grid";
    grid.append(createEmptyState("Select a specific quarter or use the standard Q1-Q4 YYYY format."));
    elements.calendarView.replaceChildren(grid);
    return;
  }

  const itemsByMonth = Object.fromEntries(
    baseMonths.map((month) => [
      month,
      filtered
        .filter((item) => item.quarter === activeQuarter)
        .filter((item) => getItemMonthLabel(item) === month)
        .sort(getColumnSort()),
    ])
  );

  renderCollapsibleColumnView({
    viewKey: "calendar",
    labels: baseMonths,
    defaultExpandedLabel: baseMonths.find((month) => itemsByMonth[month].length > 0) || baseMonths[0],
    getItemsForLabel: (month) => itemsByMonth[month],
    getDropChanges: (item, month) => buildMonthDropChanges(item, month, activeQuarter),
    countLabel: (count) => `${count} items`,
    emptyViewMessage: "Select a specific quarter or use the standard Q1-Q4 YYYY format.",
    emptyColumnMessage: "No planned content in this month yet.",
    gridClassName: "calendar-grid",
    target: elements.calendarView,
  });
}

function renderSocialView() {
  const filtered = getFilteredInitiatives().filter((item) => item.type === SOCIAL_TYPE);
  const activeQuarter = getFocusedQuarter(filtered);
  const [quarterKey] = activeQuarter.split(" ");
  const baseMonths = QUARTER_MONTHS[quarterKey];

  if (!baseMonths) {
    const grid = document.createElement("div");
    grid.className = "calendar-grid";
    grid.append(createEmptyState("Select a specific quarter or use the standard Q1-Q4 YYYY format."));
    elements.socialView.replaceChildren(grid);
    return;
  }

  const activeQuarterItems = filtered.filter((item) => item.quarter === activeQuarter);
  if (activeQuarterItems.length === 0) {
    elements.socialView.replaceChildren(createEmptyState("No planned social posts yet."));
    return;
  }

  const itemsByMonth = Object.fromEntries(
    baseMonths.map((month) => [
      month,
      activeQuarterItems
        .filter((item) => getItemMonthLabel(item) === month)
        .sort(getColumnSort()),
    ])
  );

  renderCollapsibleColumnView({
    viewKey: "social",
    labels: baseMonths,
    defaultExpandedLabel: baseMonths.find((month) => itemsByMonth[month].length > 0) || baseMonths[0],
    getItemsForLabel: (month) => itemsByMonth[month],
    getDropChanges: (item, month) => buildMonthDropChanges(item, month, activeQuarter),
    countLabel: (count) => `${count} posts`,
    emptyViewMessage: "Select a specific quarter or use the standard Q1-Q4 YYYY format.",
    emptyColumnMessage: "No planned social posts in this month yet.",
    gridClassName: "calendar-grid",
    target: elements.socialView,
  });
}

function renderGoalsView() {
  const wrapper = document.createElement("section");
  wrapper.className = "goals-panel";
  wrapper.innerHTML = `
    <div class="goals-editor-shell">
      <div class="goals-editor-frame">
        <div class="goals-editor-toolbar">
          <button class="editor-tool" type="button" data-command="bold" aria-label="Bold"><strong>B</strong></button>
          <button class="editor-tool" type="button" data-command="italic" aria-label="Italic"><em>I</em></button>
          <button class="editor-tool" type="button" data-command="underline" aria-label="Underline"><span class="tool-underline">U</span></button>
          <button class="editor-tool" type="button" data-command="strikeThrough" aria-label="Strikethrough"><span class="tool-strike">S</span></button>
          <span class="editor-separator" aria-hidden="true"></span>
          <button class="editor-tool" type="button" data-command="insertUnorderedList" aria-label="Bulleted list">List</button>
          <button class="editor-tool" type="button" data-command="insertOrderedList" aria-label="Numbered list">1 2 3</button>
          <span class="editor-separator" aria-hidden="true"></span>
          <button class="editor-tool" type="button" data-command="formatBlock" data-value="blockquote" aria-label="Quote">99</button>
          <button class="editor-tool" type="button" data-command="createLink" aria-label="Insert link">Link</button>
          <button class="editor-tool" type="button" data-command="formatBlock" data-value="h3" aria-label="Heading">Aa</button>
          <button class="editor-tool" type="button" data-command="removeFormat" aria-label="Remove formatting">Tx</button>
          <button class="editor-tool editor-tool-clear" type="button" data-command="clearEditor" aria-label="Clear editor">Trash</button>
        </div>
        <div
          class="goals-editor"
          id="goals-editor"
          contenteditable="true"
          spellcheck="true"
          data-placeholder="Type a message"
        ></div>
        <div class="goals-editor-footer">
          <span class="goals-editor-hint">Formatting syncs automatically</span>
          <div class="goals-editor-footer-actions">
            <button class="editor-footer-button" type="button" data-command="foreColor" data-value="#5b61d6" aria-label="Accent text">A</button>
            <button class="editor-footer-button" type="button" data-command="insertText" data-value="-" aria-label="Insert dash">-</button>
            <button class="editor-footer-button" type="button" data-command="insertHorizontalRule" aria-label="Insert divider">+</button>
          </div>
        </div>
      </div>
    </div>
  `;
  elements.goalsView.replaceChildren(wrapper);

  const editor = wrapper.querySelector("#goals-editor");
  editor.innerHTML = state.goalsHtml;

  wrapper.querySelector(".goals-editor-toolbar").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-command]");
    if (!button) {
      return;
    }
    event.preventDefault();
    editor.focus();
    if (button.dataset.command === "createLink") {
      const url = window.prompt("Paste a URL to link to:");
      if (!url) {
        return;
      }
      document.execCommand("createLink", false, url);
    } else if (button.dataset.command === "clearEditor") {
      editor.innerHTML = "";
    } else if (button.dataset.command === "insertText") {
      document.execCommand("insertText", false, button.dataset.value || "");
    } else {
      document.execCommand(button.dataset.command, false, button.dataset.value || null);
    }
    state.goalsHtml = editor.innerHTML;
    persistGoalsHtml();
    queueGoalsSave();
  });

  editor.addEventListener("input", () => {
    state.goalsHtml = editor.innerHTML;
    persistGoalsHtml();
    queueGoalsSave();
  });
}

function renderRequestsView() {
  const requests = getFilteredRequests();
  const wrapper = document.createElement("section");
  wrapper.className = "requests-panel";

  const summary = document.createElement("section");
  summary.className = "requests-summary";
  summary.innerHTML = `
    <div>
      <h2>Marketing Request Intake</h2>
      <p>Catalog new asks before they become active initiatives.</p>
    </div>
    <span class="request-count">${requests.length} requests</span>
  `;
  wrapper.append(summary);

  if (requests.length === 0) {
    wrapper.append(createEmptyState("No requests match the current quarter or channel filters."));
    elements.requestsView.replaceChildren(wrapper);
    return;
  }

  const grid = document.createElement("div");
  grid.className = "requests-grid";
  requests.forEach((request) => {
    grid.append(createRequestCard(request));
  });
  wrapper.append(grid);
  elements.requestsView.replaceChildren(wrapper);
}

function renderCardStack(items) {
  const stack = document.createElement("div");
  stack.className = "initiative-stack";

  items.forEach((item) => {
    stack.append(createInitiativeCard(item));
  });

  return stack;
}

function createInitiativeCard(item) {
  const fragment = elements.cardTemplate.content.cloneNode(true);
  const card = fragment.querySelector(".initiative-card");
  const config = STATUS_CONFIG[item.status];
  const channelBadge = fragment.querySelector(".channel-badge");
  const selectToggle = fragment.querySelector(".card-select-toggle");
  const selectCheckbox = fragment.querySelector(".card-select-checkbox");
  const isSelected = state.selectedInitiativeIds.includes(item.id);

  fragment.querySelector(".type-badge").textContent = item.type;
  channelBadge.textContent = getChannelBadgeSummary(item.channels);
  fragment.querySelector(".card-title").textContent = item.name;
  fragment.querySelector(".owner-pill").textContent = item.owner;
  fragment.querySelector(".deadline-pill").textContent = getDateBadgeLabel(item);
  fragment.querySelector(".status-label").textContent = item.status;
  fragment.querySelector(".status-label").style.color = "#f7fbff";
  fragment.querySelector(".status-label").style.borderColor = "transparent";
  fragment.querySelector(".status-label").style.background = config.color;
  selectCheckbox.checked = isSelected;
  selectCheckbox.setAttribute("aria-label", `Select ${item.name}`);
  card.classList.toggle("selected", isSelected);
  card.classList.toggle("archived", item.isArchived);
  card.classList.add(`status-${item.status.toLowerCase().replace(/\s+/g, "-")}`);

  selectToggle.addEventListener("click", (event) => {
    event.stopPropagation();
  });
  selectCheckbox.addEventListener("click", (event) => {
    event.stopPropagation();
  });
  selectCheckbox.addEventListener("change", (event) => {
    event.stopPropagation();
    toggleInitiativeSelection(item.id);
  });
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", `Open details for ${item.name}`);
  card.draggable = isCardWorkspaceView();
  card.addEventListener("dragstart", (event) => {
    setDraggedInitiative(item.id);
    card.classList.add("dragging");
    event.dataTransfer?.setData("text/plain", item.id);
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = "move";
    }
  });
  card.addEventListener("dragend", () => {
    card.classList.remove("dragging");
    window.setTimeout(clearDraggedInitiative, 0);
  });
  card.addEventListener("click", () => {
    openDetailsDialog(item.id);
  });
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openDetailsDialog(item.id);
    }
  });

  card.dataset.id = item.id;
  return fragment;
}

function syncTabs() {
  elements.tabButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.view === state.activeView);
  });
  elements.sortControl.hidden = state.activeView === "goals";
}

function openDialog(id = null, requestId = null) {
  state.editingId = id;
  state.convertingRequestId = requestId;
  elements.form.reset();
  elements.channelSelectionError.hidden = true;
  elements.channelSelectionError.textContent = "Select at least one channel.";
  populateEditorTypeOptions();
  populateQuarterOptions();

  const nameField = getField("name");
  const typeField = getField("type");
  const ownerField = getField("owner");
  const quarterField = getField("quarter");
  const statusField = getField("status");
  const deadlineField = getField("deadline");
  const startDateField = getField("startDate");
  const endDateField = getField("endDate");
  const descriptionField = getField("description");

  if (id) {
    const item = getInitiativeById(id);
    elements.dialogTitle.textContent = "Edit Initiative";
    nameField.value = item.name;
    typeField.value = item.type;
    ownerField.value = item.owner;
    quarterField.value = item.quarter;
    statusField.value = item.status;
    deadlineField.value = item.deadline;
    startDateField.value = item.startDate || "";
    endDateField.value = item.endDate || "";
    descriptionField.value = item.description;
    populateEditorChannelOptions();
    syncEditorChannels(item.channels);
  } else if (requestId) {
    const request = getRequestById(requestId);
    if (!request) {
      state.convertingRequestId = null;
      return;
    }
    const suggestedType = getSuggestedTypeForRequest(request);
    elements.dialogTitle.textContent = "Convert Request to Initiative";
    nameField.value = request.name;
    typeField.value = suggestedType;
    ownerField.value = OWNERS[0];
    quarterField.value = request.quarter;
    statusField.value = "Planned";
    deadlineField.value = suggestedType === "Event" ? "" : request.neededBy || "";
    startDateField.value = "";
    endDateField.value = suggestedType === "Event" ? request.neededBy || "" : "";
    descriptionField.value = request.notes;
    populateEditorChannelOptions();
    syncEditorChannels(request.channels);
  } else {
    elements.dialogTitle.textContent = "Create New Initiative";
    quarterField.value = getFocusedQuarter(state.initiatives);
    ownerField.value = OWNERS[0];
    typeField.value = TYPE_OPTIONS[0];
    populateEditorChannelOptions();
  }

  syncInitiativeTypeFields();
  elements.dialog.showModal();
}

function openRequestDialog() {
  elements.requestForm.reset();
  elements.requestSelectionError.hidden = true;
  populateRequestQuarterOptions();
  populateRequestChannelOptions();
  getRequestField("quarter").value = getFocusedQuarter(state.initiatives);
  getRequestField("requestedDate").value = getLocalDateInputValue();
  elements.requestDialog.showModal();
}

function closeDialog() {
  state.editingId = null;
  state.convertingRequestId = null;
  elements.dialog.close();
}

function closeRequestDialog() {
  elements.requestDialog.close();
}

function openRequestDetailsDialog(id) {
  const request = getRequestById(id);
  if (!request) {
    return;
  }

  elements.requestDetailsDialog.dataset.id = id;
  elements.requestDetailsTitle.textContent = request.name;
  elements.requestDetailsChipRow.innerHTML = "";

  ["New Request", ...request.channels].forEach((label, index) => {
    const badge = document.createElement("span");
    badge.className = index === 0 ? "type-badge" : "channel-badge";
    badge.textContent = label;
    elements.requestDetailsChipRow.append(badge);
  });

  elements.requestDetailsMeta.innerHTML = `
    <div class="detail-meta-item">
      <span>Requested By</span>
      <strong>${request.requestedBy}</strong>
    </div>
    <div class="detail-meta-item">
      <span>Target Quarter</span>
      <strong>${request.quarter}</strong>
    </div>
    <div class="detail-meta-item">
      <span>Requested On</span>
      <strong>${request.requestedDate ? formatDate(request.requestedDate) : "Not set"}</strong>
    </div>
    <div class="detail-meta-item">
      <span>Requested Due Date</span>
      <strong>${request.neededBy ? formatDate(request.neededBy) : "Not set"}</strong>
    </div>
  `;
  elements.requestDetailsDescription.textContent = request.notes || "No additional request details provided.";
  elements.requestDetailsDialog.showModal();
}

function closeRequestDetailsDialog() {
  elements.requestDetailsDialog.close();
}

function openDetailsDialog(id) {
  const item = getInitiativeById(id);
  if (!item) {
    return;
  }

  elements.detailsDialog.dataset.id = id;
  elements.detailsTitle.textContent = item.name;
  elements.detailsChipRow.innerHTML = "";

  [item.type, ...item.channels].forEach((label) => {
    const badge = document.createElement("span");
    badge.className = label === item.type ? "type-badge" : "channel-badge";
    badge.textContent = label;
    elements.detailsChipRow.append(badge);
  });

  elements.detailsMeta.innerHTML = `
    <div class="detail-meta-item">
      <span>Owner</span>
      <strong>${item.owner}</strong>
    </div>
    <div class="detail-meta-item">
      <span>Quarter</span>
      <strong>${item.quarter}</strong>
    </div>
    <div class="detail-meta-item">
      <span>Status</span>
      <strong style="color:${STATUS_CONFIG[item.status].color}">${item.status}</strong>
    </div>
    <div class="detail-meta-item">
      <span>Archive</span>
      <strong>${item.isArchived ? "Archived" : "Active"}</strong>
    </div>
    <div class="detail-meta-item">
      <span>${item.type === "Event" ? "Event Window" : "Due Date"}</span>
      <strong>${getDetailDateLabel(item)}</strong>
    </div>
  `;
  elements.detailsDescription.textContent = item.description || "No additional context provided.";
  elements.initiativeArchiveButton.textContent = item.isArchived ? "Restore Initiative" : "Archive Initiative";
  elements.detailsDialog.showModal();
}

function closeDetailsDialog() {
  elements.detailsDialog.close();
}

function handleDetailsEdit() {
  const id = elements.detailsDialog.dataset.id;
  closeDetailsDialog();
  openDialog(id);
}

function handleRequestConvert() {
  const id = elements.requestDetailsDialog.dataset.id;
  closeRequestDetailsDialog();
  openDialog(null, id);
}

async function handleRequestDelete() {
  const id = elements.requestDetailsDialog.dataset.id;
  const request = getRequestById(id);
  if (!request || !window.confirm(`Delete "${request.name}"?`)) {
    return;
  }

  if (isSharedWorkspaceActive()) {
    setSyncState({
      mode: "saving",
      message: `Deleting "${request.name}" from the shared workspace…`,
      canPublishLocalData: false,
      isBusy: true,
    });

    try {
      await deleteRequestInShared(id);
      await hydrateSharedState({ background: true, preserveStatus: true, force: true });
      setSharedReadyStatus();
    } catch (error) {
      console.error(error);
      await hydrateSharedState({ background: true, suppressErrors: true, preserveStatus: true, force: true });
      setSyncState({
        mode: "error",
        message: `Could not delete "${request.name}" from the shared workspace.`,
        canPublishLocalData: false,
        isBusy: false,
      });
      window.alert(`"${request.name}" was not deleted from the shared workspace. Please try again.`);
      return;
    }
  } else {
    state.requests = state.requests.filter((item) => item.id !== id);
    persistRequests();
  }

  closeRequestDetailsDialog();
  renderViews();
}

function handleTypeEditorChange() {
  syncInitiativeTypeFields(true);
}

async function handleInitiativeDelete() {
  const id = elements.detailsDialog.dataset.id;
  const initiative = getInitiativeById(id);
  if (!initiative || !window.confirm(`Delete "${initiative.name}"?`)) {
    return;
  }

  if (isSharedWorkspaceActive()) {
    setSyncState({
      mode: "saving",
      message: `Deleting "${initiative.name}" from the shared workspace…`,
      canPublishLocalData: false,
      isBusy: true,
    });

    try {
      await deleteInitiativeInShared(id);
      await hydrateSharedState({ background: true, preserveStatus: true, force: true });
      setSharedReadyStatus();
    } catch (error) {
      console.error(error);
      await hydrateSharedState({ background: true, suppressErrors: true, preserveStatus: true, force: true });
      setSyncState({
        mode: "error",
        message: `Could not delete "${initiative.name}" from the shared workspace.`,
        canPublishLocalData: false,
        isBusy: false,
      });
      window.alert(`"${initiative.name}" was not deleted from the shared workspace. Please try again.`);
      return;
    }
  } else {
    state.initiatives = state.initiatives.filter((item) => item.id !== id);
    persistInitiatives();
  }

  closeDetailsDialog();
  render();
}

async function handleInitiativeArchiveToggle() {
  const id = elements.detailsDialog.dataset.id;
  const initiative = getInitiativeById(id);
  if (!initiative) {
    return;
  }

  const nextArchivedState = !initiative.isArchived;
  const verb = nextArchivedState ? "archive" : "restore";
  if (!window.confirm(`${verb.charAt(0).toUpperCase()}${verb.slice(1)} "${initiative.name}"?`)) {
    return;
  }

  const success = await updateInitiativesInBulk(
    [id],
    {
      isArchived: nextArchivedState,
      archivedAt: nextArchivedState ? new Date().toISOString() : "",
    },
    `${nextArchivedState ? "Archiving" : "Restoring"} "${initiative.name}"…`,
    `Could not ${verb} "${initiative.name}".`
  );

  if (success) {
    closeDetailsDialog();
    render();
  }
}

async function handleFormSubmit(event) {
  event.preventDefault();

  const channels = getSelectedEditorChannels();
  if (channels.length === 0) {
    elements.channelSelectionError.hidden = false;
    return;
  }

  const formData = new FormData(elements.form);
  const type = formData.get("type").toString();
  const deadline = type === "Event" ? "" : formData.get("deadline").toString();
  const startDate = type === "Event" ? formData.get("startDate").toString() : "";
  const endDate = type === "Event" ? formData.get("endDate").toString() : "";
  const effectiveDeadline = type === "Event" ? endDate : deadline;
  if (type === "Event" && (!startDate || !endDate)) {
    elements.channelSelectionError.hidden = false;
    elements.channelSelectionError.textContent = "Set both event start and end dates.";
    return;
  }
  if (type !== "Strategic Initiative" && type !== "Event" && !deadline) {
    elements.channelSelectionError.hidden = false;
    elements.channelSelectionError.textContent = "Set a due date for scheduled work.";
    return;
  }
  elements.channelSelectionError.hidden = true;
  elements.channelSelectionError.textContent = "Select at least one channel.";
  const existingItem = state.editingId ? getInitiativeById(state.editingId) : null;
  const nextItem = {
    id: state.editingId || createId(),
    name: formData.get("name").toString().trim(),
    type,
    channels,
    owner: formData.get("owner").toString(),
    quarter: formData.get("quarter").toString(),
    status: formData.get("status").toString(),
    deadline: effectiveDeadline,
    startDate,
    endDate,
    description: formData.get("description").toString().trim(),
    isArchived: existingItem?.isArchived || false,
    archivedAt: existingItem?.archivedAt || "",
  };

  if (isSharedWorkspaceActive()) {
    const operationLabel = state.editingId ? "Updating initiative in the shared workspace…" : "Saving initiative to the shared workspace…";

    setSyncState({
      mode: "saving",
      message: operationLabel,
      canPublishLocalData: false,
      isBusy: true,
    });

    try {
      await saveInitiativeInShared(nextItem, Boolean(state.editingId));
      if (state.convertingRequestId) {
        await deleteRequestInShared(state.convertingRequestId);
      }
      await hydrateSharedState({ background: true, preserveStatus: true, force: true });
      closeDialog();
      render();
      setSharedReadyStatus();
      return;
    } catch (error) {
      console.error(error);
      await hydrateSharedState({ background: true, suppressErrors: true, preserveStatus: true, force: true });
      setSyncState({
        mode: "error",
        message: "Could not save that initiative to the shared workspace.",
        canPublishLocalData: false,
        isBusy: false,
      });
      window.alert("This initiative was not saved to the shared workspace. Please try again.");
      return;
    }
  }

  if (state.editingId) {
    state.initiatives = state.initiatives.map((item) => (item.id === state.editingId ? nextItem : item));
  } else {
    state.initiatives = [nextItem, ...state.initiatives];
  }

  if (state.convertingRequestId) {
    state.requests = state.requests.filter((item) => item.id !== state.convertingRequestId);
    persistRequests();
  }

  persistInitiatives();
  closeDialog();
  render();
}

async function handleRequestFormSubmit(event) {
  event.preventDefault();

  const channels = getSelectedRequestChannels();
  if (channels.length === 0) {
    elements.requestSelectionError.hidden = false;
    return;
  }

  const formData = new FormData(elements.requestForm);
  const request = {
    id: createId(),
    name: formData.get("name").toString().trim(),
    requestedBy: formData.get("requestedBy").toString().trim(),
    quarter: formData.get("quarter").toString(),
    requestedDate: formData.get("requestedDate").toString(),
    neededBy: formData.get("neededBy").toString(),
    channels,
    notes: formData.get("notes").toString().trim(),
  };

  if (isSharedWorkspaceActive()) {
    setSyncState({
      mode: "saving",
      message: "Saving request to the shared workspace…",
      canPublishLocalData: false,
      isBusy: true,
    });

    try {
      await saveRequestInShared(request);
      await hydrateSharedState({ background: true, preserveStatus: true, force: true });
      closeRequestDialog();
      state.activeView = "requests";
      render();
      setSharedReadyStatus();
      return;
    } catch (error) {
      console.error(error);
      await hydrateSharedState({ background: true, suppressErrors: true, preserveStatus: true, force: true });
      setSyncState({
        mode: "error",
        message: "Could not save that request to the shared workspace.",
        canPublishLocalData: false,
        isBusy: false,
      });
      window.alert("This request was not saved to the shared workspace. Please try again.");
      return;
    }
  }

  state.requests = [request, ...state.requests];
  persistRequests();
  closeRequestDialog();
  state.activeView = "requests";
  render();
}

function isSharedWorkspaceActive() {
  return ["shared", "saving", "error"].includes(state.sync.mode);
}

function shouldSkipBackgroundRefresh() {
  return (
    document.hidden ||
    state.sync.mode === "saving" ||
    elements.dialog.open ||
    elements.requestDialog.open ||
    elements.detailsDialog.open ||
    elements.requestDetailsDialog.open ||
    goalsSaveTimeout > 0
  );
}

function hasMeaningfulLocalData() {
  return state.initiatives.length > 0 || state.requests.length > 0 || state.goalsHtml.trim().length > 0;
}

function applySharedState(payload) {
  state.initiatives = normalizeInitiatives(payload.initiatives, { fallbackToDefaults: false });
  state.requests = normalizeRequests(payload.requests);
  state.goalsHtml =
    typeof payload.goalsHtml === "string" ? payload.goalsHtml : buildDefaultGoalsHtml();
  persistInitiatives();
  persistRequests();
  persistGoalsHtml();
}

async function hydrateSharedState({ background = false, suppressErrors = false, preserveStatus = false, force = false } = {}) {
  if (background && !force && (!isSharedWorkspaceActive() || shouldSkipBackgroundRefresh())) {
    return null;
  }

  if (!background && !preserveStatus) {
    setSyncState({
      mode: "connecting",
      message: "Connecting to shared workspace…",
      canPublishLocalData: false,
      isBusy: false,
    });
  }

  try {
    const [initiatives, requests, goals] = await Promise.all([
      fetchInitiativesFromShared(),
      fetchRequestsFromShared(),
      fetchGoalsFromShared(),
    ]);

    if (!initiatives.length && !requests.length && !goals.exists) {
      if (!background && hasMeaningfulLocalData()) {
        showPublishStatus(
          "Shared workspace is empty. Publish the data in this browser once to make it shared for everyone."
        );
      }
      return null;
    }

    applySharedState({
      initiatives,
      requests,
      goalsHtml: goals.exists ? goals.html : state.goalsHtml,
    });
    render();

    if (!preserveStatus) {
      setSharedReadyStatus();
    }

    return {
      initiatives,
      requests,
      goals,
    };
  } catch (error) {
    if (!suppressErrors) {
      console.error(error);
    }
    if (!background && !suppressErrors) {
      showLocalOnlyStatus("Shared workspace unavailable. Changes stay in this browser only.");
    }
    return null;
  }
}

async function publishLocalDataToShared() {
  showPublishStatus("Publishing current browser data to the shared workspace…", true);

  try {
    await requestSharedJson("bootstrap", {
      method: "POST",
      body: {
        initiatives: state.initiatives,
        requests: state.requests,
        goalsHtml: state.goalsHtml,
      },
    });
    await hydrateSharedState({ preserveStatus: true });
    setSharedReadyStatus();
  } catch (error) {
    console.error(error);
    if (error.message.includes("already initialized")) {
      await hydrateSharedState({ preserveStatus: true, suppressErrors: true });
      setSharedReadyStatus();
      return;
    }
    showPublishStatus(
      `Could not publish browser data to the shared workspace. ${error.message || "Your browser copy is still intact."}`
    );
    window.alert(
      `Publishing to the shared workspace failed.\n\n${error.message || "Your current browser data was not lost."}`
    );
  }
}

function queueGoalsSave() {
  window.clearTimeout(goalsSaveTimeout);
  goalsSaveTimeout = 0;

  if (!isSharedWorkspaceActive()) {
    return;
  }

  goalsSaveTimeout = window.setTimeout(async () => {
    goalsSaveTimeout = 0;
    setSyncState({
      mode: "saving",
      message: "Saving goals to the shared workspace…",
      canPublishLocalData: false,
      isBusy: true,
    });

    try {
      await saveGoalsHtmlInShared(state.goalsHtml);
      setSharedReadyStatus();
    } catch (error) {
      console.error(error);
      setSyncState({
        mode: "error",
        message: "Goals were saved in this browser, but not to the shared workspace.",
        canPublishLocalData: false,
        isBusy: false,
      });
    }
  }, 600);
}

async function requestSharedJson(endpoint, { method = "GET", body, query } = {}) {
  const url = new URL(`${API_BASE}/${endpoint}`, window.location.origin);
  Object.entries(query || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });

  const response = await fetch(url, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || `Shared request failed with status ${response.status}.`);
  }

  return payload;
}

function fetchInitiativesFromShared() {
  return requestSharedJson("initiatives");
}

function saveInitiativeInShared(item, isEditing) {
  return requestSharedJson("initiatives", {
    method: isEditing ? "PATCH" : "POST",
    query: isEditing ? { id: item.id } : undefined,
    body: item,
  });
}

function deleteInitiativeInShared(id) {
  return requestSharedJson("initiatives", {
    method: "DELETE",
    query: { id },
  });
}

function fetchRequestsFromShared() {
  return requestSharedJson("requests");
}

function saveRequestInShared(request) {
  return requestSharedJson("requests", {
    method: "POST",
    body: request,
  });
}

function deleteRequestInShared(id) {
  return requestSharedJson("requests", {
    method: "DELETE",
    query: { id },
  });
}

function fetchGoalsFromShared() {
  return requestSharedJson("goals");
}

function saveGoalsHtmlInShared(html) {
  return requestSharedJson("goals", {
    method: "PUT",
    body: { html },
  });
}

function bulkUpdateInitiativesInShared(ids, changes) {
  return requestSharedJson("initiatives-bulk", {
    method: "PATCH",
    body: { ids, changes },
  });
}

function applyInitiativeChanges(item, changes) {
  const nextItem = {
    ...item,
    owner: changes.owner || item.owner,
    quarter: changes.quarter || item.quarter,
    status: changes.status || item.status,
    channels: Array.isArray(changes.channels) && changes.channels.length > 0 ? changes.channels : item.channels,
    deadline: typeof changes.deadline === "string" ? changes.deadline : item.deadline,
    startDate: typeof changes.startDate === "string" ? changes.startDate : item.startDate,
    endDate: typeof changes.endDate === "string" ? changes.endDate : item.endDate,
  };

  if (typeof changes.isArchived === "boolean") {
    nextItem.isArchived = changes.isArchived;
    nextItem.archivedAt = changes.isArchived ? changes.archivedAt || new Date().toISOString() : "";
  }

  return nextItem;
}

async function updateInitiativesInBulk(ids, changes, savingMessage, failureMessage) {
  if (!ids.length) {
    return false;
  }

  if (isSharedWorkspaceActive()) {
    setSyncState({
      mode: "saving",
      message: savingMessage,
      canPublishLocalData: false,
      isBusy: true,
    });

    try {
      await bulkUpdateInitiativesInShared(ids, changes);
      await hydrateSharedState({ background: true, preserveStatus: true, force: true });
      setSharedReadyStatus();
      return true;
    } catch (error) {
      console.error(error);
      await hydrateSharedState({ background: true, suppressErrors: true, preserveStatus: true, force: true });
      setSyncState({
        mode: "error",
        message: `${failureMessage} ${error.message || ""}`.trim(),
        canPublishLocalData: false,
        isBusy: false,
      });
      window.alert(`${failureMessage}\n\n${error.message || "The shared workspace rejected the request."}`);
      return false;
    }
  }

  state.initiatives = state.initiatives.map((item) => (
    ids.includes(item.id) ? applyInitiativeChanges(item, changes) : item
  ));
  persistInitiatives();
  return true;
}

function loadInitiatives() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return normalizeInitiatives(JSON.parse(saved));
    }
  } catch (error) {
    return defaultInitiatives;
  }

  return defaultInitiatives;
}

function persistInitiatives() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.initiatives));
}

function loadRequests() {
  try {
    const saved = window.localStorage.getItem(REQUESTS_STORAGE_KEY);
    if (saved) {
      return normalizeRequests(JSON.parse(saved));
    }
  } catch (error) {
    return [];
  }

  return [];
}

function loadGoalsHtml() {
  try {
    const saved = window.localStorage.getItem(GOALS_STORAGE_KEY);
    if (saved) {
      return saved;
    }
  } catch (error) {
    return buildDefaultGoalsHtml();
  }

  return buildDefaultGoalsHtml();
}

function persistRequests() {
  window.localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(state.requests));
}

function persistGoalsHtml() {
  window.localStorage.setItem(GOALS_STORAGE_KEY, state.goalsHtml);
}

function normalizeInitiatives(items, { fallbackToDefaults = true } = {}) {
  if (!Array.isArray(items) || items.length === 0) {
    return fallbackToDefaults ? defaultInitiatives : [];
  }

  return items.map((item) => {
    const channels = normalizeChannels(item.channels ?? item.channel);
    const type = normalizeType(item.type, item.name);
    const deadline = typeof item.deadline === "string" ? item.deadline : "";
    const startDate = typeof item.startDate === "string" ? item.startDate : "";
    const endDate = typeof item.endDate === "string" ? item.endDate : type === "Event" ? deadline : "";
    const archivedAt = typeof item.archivedAt === "string" ? item.archivedAt : "";
    return {
      id: item.id || createId(),
      name: item.name || "Untitled initiative",
      type,
      channels,
      owner: normalizeOwner(item.owner),
      quarter: parseQuarterLabel(item.quarter) ? item.quarter : getCurrentQuarterLabel(),
      status: STATUS_CONFIG[item.status] ? item.status : "Planned",
      deadline,
      startDate,
      endDate,
      description: typeof item.description === "string" ? item.description : "",
      isArchived: Boolean(item.isArchived),
      archivedAt,
    };
  });
}

function normalizeRequests(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return [];
  }

  return items.map((item) => ({
    id: item.id || createId(),
    name: typeof item.name === "string" && item.name.trim() ? item.name.trim() : "Untitled request",
    requestedBy:
      typeof item.requestedBy === "string" && item.requestedBy.trim() ? item.requestedBy.trim() : "Unknown",
    quarter: parseQuarterLabel(item.quarter) ? item.quarter : getCurrentQuarterLabel(),
    requestedDate: typeof item.requestedDate === "string" ? item.requestedDate : "",
    neededBy: typeof item.neededBy === "string" ? item.neededBy : "",
    channels: normalizeChannels(item.channels ?? item.channel),
    notes: typeof item.notes === "string" ? item.notes : "",
  }));
}

function normalizeChannels(value) {
  if (Array.isArray(value)) {
    const valid = value.filter((channel) => CHANNELS.includes(channel));
    return valid.length ? valid : [CHANNELS[0]];
  }

  if (typeof value === "string") {
    if (CHANNELS.includes(value)) {
      return [value];
    }
    if (value === "Multi-channel") {
      return ["Inbound", "Outbound"];
    }
  }

  return [CHANNELS[0]];
}

function normalizeOwner(owner) {
  if (OWNERS.includes(owner)) {
    return owner;
  }
  if (OWNER_MIGRATION[owner]) {
    return OWNER_MIGRATION[owner];
  }
  return OWNERS[0];
}

function normalizeType(type, name = "") {
  if (TYPE_OPTIONS.includes(type)) {
    return type;
  }

  if (type === "Website/Landing Pages") {
    return "Website Only";
  }

  if (type === "Initiative" || type === "Campaign") {
    return "Strategic Initiative";
  }

  if (type === "Event") {
    return "Event";
  }

  if (type === "Content") {
    return inferContentType(name);
  }

  return inferContentType(name);
}

function inferContentType(name = "") {
  const lower = name.toLowerCase();
  if (lower.includes("linkedin") || lower.includes("social") || lower.includes("post")) {
    return "Social Posts";
  }
  if (lower.includes("website") || lower.includes("landing")) {
    return "Website Only";
  }
  if (lower.includes("blog")) {
    return "Blog Posts";
  }
  if (lower.includes("ebook") || lower.includes("guide")) {
    return "Ebooks/Guides";
  }
  if (lower.includes("webinar")) {
    return "Webinars";
  }
  if (lower.includes("video")) {
    return "Video";
  }
  if (lower.includes("case study")) {
    return "Case Studies";
  }
  return "Other Sales Collateral";
}

function setSelectOptions(select, defaultLabel, values, includeDefault) {
  const currentValue = select.value || defaultLabel;
  select.innerHTML = "";

  if (includeDefault) {
    const defaultOption = document.createElement("option");
    defaultOption.value = defaultLabel;
    defaultOption.textContent = defaultLabel;
    select.append(defaultOption);
  }

  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.append(option);
  });

  const validCurrent = values.includes(currentValue) || (includeDefault && currentValue === defaultLabel);
  select.value = validCurrent ? currentValue : includeDefault ? defaultLabel : values[0];
}

function getCheckedValues(container) {
  return [...container.querySelectorAll('input[type="checkbox"]:checked')].map((input) => input.value);
}

function getSelectedEditorChannels() {
  return getCheckedValues(elements.channelEditorGrid);
}

function getSelectedRequestChannels() {
  return getCheckedValues(elements.requestChannelEditorGrid);
}

function syncEditorChannels(channels) {
  elements.channelEditorGrid.querySelectorAll('input[type="checkbox"]').forEach((input) => {
    input.checked = channels.includes(input.value);
  });
}

function syncInitiativeTypeFields(clearHiddenValues = false) {
  const isEvent = elements.typeEditor.value === "Event";
  const requiresDeadline = !["Strategic Initiative", "Event"].includes(elements.typeEditor.value);
  elements.eventDateFields.hidden = !isEvent;
  elements.initiativeDeadlineField.hidden = isEvent;

  const startDateField = getField("startDate");
  const endDateField = getField("endDate");
  const deadlineField = getField("deadline");

  startDateField.disabled = !isEvent;
  endDateField.disabled = !isEvent;
  deadlineField.disabled = isEvent;
  startDateField.required = isEvent;
  endDateField.required = isEvent;
  deadlineField.required = requiresDeadline;

  if (clearHiddenValues) {
    if (isEvent) {
      deadlineField.value = "";
    } else {
      startDateField.value = "";
      endDateField.value = "";
    }
  }
}

function populateRequestChannelOptions() {
  elements.requestChannelEditorGrid.replaceChildren(
    ...CHANNELS.map((channel) => createChannelCheckbox(channel, false, "request"))
  );
}

function getAvailableQuarters() {
  return uniqueValues([...generateQuarterOptions(), ...state.initiatives.map((item) => item.quarter)]);
}

function generateQuarterOptions() {
  const current = parseQuarterLabel(getCurrentQuarterLabel());
  const options = [];

  for (let offset = -1; offset <= 6; offset += 1) {
    const total = current.year * 4 + (current.quarter - 1) + offset;
    const year = Math.floor(total / 4);
    const quarter = (total % 4) + 1;
    options.push(`Q${quarter} ${year}`);
  }

  return options;
}

function uniqueValues(values) {
  return [...new Set(values)].sort(compareQuarterAware);
}

function sortItemsForColumn(items) {
  return [...items].sort(getColumnSort());
}

function getColumnSort() {
  return state.sortMode === "due-date" ? sortByDeadlineThenName : sortByQuarterThenName;
}

function sortByQuarterThenName(left, right) {
  const quarterSort = compareQuarterAware(left.quarter, right.quarter);
  return quarterSort || left.name.localeCompare(right.name);
}

function sortByDeadlineThenName(left, right) {
  const leftDueDate = getEffectiveDueDate(left);
  const rightDueDate = getEffectiveDueDate(right);
  if (!leftDueDate && !rightDueDate) {
    return left.name.localeCompare(right.name);
  }
  if (!leftDueDate) {
    return 1;
  }
  if (!rightDueDate) {
    return -1;
  }
  return leftDueDate.localeCompare(rightDueDate) || left.name.localeCompare(right.name);
}

function formatDate(value) {
  return new Date(`${value}T00:00:00`).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatShortDate(value) {
  return new Date(`${value}T00:00:00`).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

function getItemMonthLabel(item) {
  const dueDate = getEffectiveDueDate(item);
  if (!dueDate) {
    return null;
  }
  return new Date(`${dueDate}T00:00:00`).toLocaleDateString(undefined, { month: "long" });
}

function getChannelBadgeSummary(channels) {
  if (channels.length <= 1) {
    return channels[0] || "";
  }

  return `${channels[0]} +${channels.length - 1} more`;
}

function getCurrentQuarterLabel() {
  const today = new Date();
  const month = today.getMonth();
  const quarter = `Q${Math.floor(month / 3) + 1}`;
  return `${quarter} ${today.getFullYear()}`;
}

function getFocusedQuarter(items) {
  if (state.filters.quarter !== "All Quarters") {
    return state.filters.quarter;
  }

  const quarters = uniqueValues(items.map((item) => item.quarter));
  if (quarters.length === 0) {
    return getCurrentQuarterLabel();
  }

  const currentQuarter = getCurrentQuarterLabel();
  const upcomingIndex = quarters.findIndex((quarter) => compareQuarterAware(quarter, currentQuarter) >= 0);
  return upcomingIndex === -1 ? quarters[quarters.length - 1] : quarters[upcomingIndex];
}

function renderCollapsibleColumnView({
  viewKey,
  labels,
  defaultExpandedLabel,
  getItemsForLabel,
  getDropChanges,
  countLabel,
  emptyViewMessage,
  emptyColumnMessage,
  gridClassName,
  target,
}) {
  const grid = document.createElement("div");
  grid.className = gridClassName;

  if (labels.length === 0) {
    grid.append(createEmptyState(emptyViewMessage));
    target.replaceChildren(grid);
    return;
  }

  const expandedLabels = getExpandedColumnSet(viewKey, labels, defaultExpandedLabel);

  labels.forEach((label) => {
    const items = getItemsForLabel(label);
    const isExpanded = expandedLabels.has(label);
    const shouldRestore = items.length > 0 && items.every((item) => item.isArchived);
    const column = document.createElement("section");
    column.className = "quarter-column";
    column.classList.toggle("collapsed", !isExpanded);
    column.dataset.viewKey = viewKey;
    column.dataset.label = label;
    column.innerHTML = `
      <header class="quarter-header">
        <div class="quarter-toggle" aria-expanded="${isExpanded}">
          <span class="quarter-heading-group">
            <span class="quarter-heading">${label}</span>
            <span class="quarter-count">${countLabel(items.length)}</span>
          </span>
          <span class="quarter-actions">
            ${isExpanded && items.length > 0 ? `<button class="quarter-archive-action" type="button">${shouldRestore ? "Restore" : "Archive"}</button>` : ""}
            <button
              class="quarter-action"
              type="button"
              aria-label="${isExpanded ? `Collapse ${label}` : `Expand ${label}`}"
              title="${isExpanded ? `Collapse ${label}` : `Expand ${label}`}"
            >
              ${isExpanded ? "Collapse" : "+"}
            </button>
          </span>
        </div>
      </header>
    `;
    column.querySelector(".quarter-action").addEventListener("click", () => toggleColumn(viewKey, label));
    column.querySelector(".quarter-archive-action")?.addEventListener("click", () => handleArchiveColumn(viewKey, label, items));
    if (typeof getDropChanges === "function") {
      column.addEventListener("dragover", (event) => {
        if (state.draggedInitiativeId) {
          event.preventDefault();
          column.classList.add("drop-target");
          if (event.dataTransfer) {
            event.dataTransfer.dropEffect = "move";
          }
        }
      });
      column.addEventListener("dragleave", (event) => {
        if (!column.contains(event.relatedTarget)) {
          column.classList.remove("drop-target");
        }
      });
      column.addEventListener("drop", async (event) => {
        event.preventDefault();
        column.classList.remove("drop-target");
        const draggedId = event.dataTransfer?.getData("text/plain") || state.draggedInitiativeId;
        if (!draggedId) {
          return;
        }
        await handleCardDrop(draggedId, viewKey, label, getDropChanges);
      });
    }

    if (isExpanded) {
      column.append(items.length === 0 ? createEmptyState(emptyColumnMessage) : renderCardStack(items));
    }

    grid.append(column);
  });

  target.replaceChildren(grid);
}

async function handleCardDrop(id, viewKey, label, getDropChanges) {
  const item = getInitiativeById(id);
  clearDraggedInitiative();
  if (!item) {
    return;
  }

  const changes = getDropChanges(item, label, viewKey);
  if (!changes || Object.keys(changes).length === 0) {
    return;
  }

  if (isSharedWorkspaceActive()) {
    const nextItem = applyInitiativeChanges(item, changes);
    setSyncState({
      mode: "saving",
      message: `Moving "${item.name}"…`,
      canPublishLocalData: false,
      isBusy: true,
    });

    try {
      await saveInitiativeInShared(nextItem, true);
      await hydrateSharedState({ background: true, preserveStatus: true, force: true });
      setSharedReadyStatus();
      return;
    } catch (error) {
      console.error(error);
      await hydrateSharedState({ background: true, suppressErrors: true, preserveStatus: true, force: true });
      setSyncState({
        mode: "error",
        message: `Could not move "${item.name}". ${error.message || ""}`.trim(),
        canPublishLocalData: false,
        isBusy: false,
      });
      window.alert(`Could not move "${item.name}".\n\n${error.message || "The shared workspace rejected the update."}`);
      return;
    }
  }

  state.initiatives = state.initiatives.map((initiative) => (
    initiative.id === id ? applyInitiativeChanges(initiative, changes) : initiative
  ));
  persistInitiatives();
  render();
}

function buildQuarterDropChanges(item, targetQuarter) {
  const changes = {};
  if (item.quarter !== targetQuarter) {
    changes.quarter = targetQuarter;
  }

  const nextDeadline = moveDateToQuarter(item.deadline, targetQuarter);
  const nextStartDate = moveDateToQuarter(item.startDate, targetQuarter);
  const nextEndDate = moveDateToQuarter(item.endDate, targetQuarter);

  if (nextDeadline && nextDeadline !== item.deadline) {
    changes.deadline = nextDeadline;
  }
  if (nextStartDate && nextStartDate !== item.startDate) {
    changes.startDate = nextStartDate;
  }
  if (nextEndDate && nextEndDate !== item.endDate) {
    changes.endDate = nextEndDate;
  }

  return changes;
}

function buildMonthDropChanges(item, targetMonth, quarterLabel) {
  const changes = {};
  if (item.quarter !== quarterLabel) {
    changes.quarter = quarterLabel;
  }

  const nextDeadline = moveDateToMonth(item.deadline, targetMonth, quarterLabel);
  const nextStartDate = moveDateToMonth(item.startDate, targetMonth, quarterLabel);
  const nextEndDate = moveDateToMonth(item.endDate, targetMonth, quarterLabel);

  if (nextDeadline && nextDeadline !== item.deadline) {
    changes.deadline = nextDeadline;
  }
  if (nextStartDate && nextStartDate !== item.startDate) {
    changes.startDate = nextStartDate;
  }
  if (nextEndDate && nextEndDate !== item.endDate) {
    changes.endDate = nextEndDate;
  }

  return changes;
}

function getQuarterStartMonthIndex(quarterLabel) {
  const parsed = parseQuarterLabel(quarterLabel);
  return parsed ? (parsed.quarter - 1) * 3 : 0;
}

function moveDateToQuarter(dateString, targetQuarterLabel) {
  if (!dateString) {
    return "";
  }

  const [yearString, monthString, dayString] = dateString.split("-");
  const parsed = parseQuarterLabel(targetQuarterLabel);
  if (!parsed) {
    return dateString;
  }

  const originalMonthIndex = Number.parseInt(monthString, 10) - 1;
  const day = Number.parseInt(dayString, 10);
  const sourceQuarterOffset = ((originalMonthIndex % 3) + 3) % 3;
  const targetMonthIndex = getQuarterStartMonthIndex(targetQuarterLabel) + sourceQuarterOffset;
  return buildClampedDate(parsed.year, targetMonthIndex, day);
}

function moveDateToMonth(dateString, targetMonthLabel, quarterLabel) {
  const parsedQuarter = parseQuarterLabel(quarterLabel);
  const targetMonthIndex = getMonthIndexByName(targetMonthLabel);
  if (!parsedQuarter || targetMonthIndex === -1) {
    return dateString || "";
  }

  const currentDay = dateString ? Number.parseInt(dateString.split("-")[2], 10) : 1;
  return buildClampedDate(parsedQuarter.year, targetMonthIndex, currentDay);
}

function buildClampedDate(year, monthIndex, day) {
  const safeDay = Number.isFinite(day) ? day : 1;
  const lastDayOfMonth = new Date(year, monthIndex + 1, 0).getDate();
  const clampedDay = Math.min(Math.max(safeDay, 1), lastDayOfMonth);
  const month = `${monthIndex + 1}`.padStart(2, "0");
  const date = `${clampedDay}`.padStart(2, "0");
  return `${year}-${month}-${date}`;
}

function getMonthIndexByName(monthLabel) {
  return [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ].indexOf(monthLabel);
}

function getExpandedColumnSet(viewKey, labels, defaultExpandedLabel = labels[0]) {
  const currentExpanded = state.expandedColumns[viewKey] || [];
  const visibleExpanded = currentExpanded.filter((label) => labels.includes(label));

  if (visibleExpanded.length === 0 && labels.length > 0) {
    state.expandedColumns[viewKey] = [labels.includes(defaultExpandedLabel) ? defaultExpandedLabel : labels[0]];
  } else {
    state.expandedColumns[viewKey] = visibleExpanded;
  }

  return new Set(state.expandedColumns[viewKey]);
}

function toggleColumn(viewKey, label) {
  const currentExpanded = state.expandedColumns[viewKey] || [];

  if (currentExpanded.includes(label)) {
    state.expandedColumns[viewKey] = currentExpanded.filter((item) => item !== label);
  } else {
    state.expandedColumns[viewKey] = [...currentExpanded, label];
  }

  renderViews();
}

function getEffectiveDueDate(item) {
  return item.endDate || item.deadline || "";
}

function getDateBadgeLabel(item) {
  if (item.type === "Event" && item.startDate && item.endDate) {
    return `${formatShortDate(item.startDate)}-${formatShortDate(item.endDate)}`;
  }
  if (item.deadline) {
    return formatDate(item.deadline);
  }
  return "Evergreen";
}

function getFilteredRequests() {
  return [...state.requests]
    .filter((item) => {
      const quarterMatch = state.filters.quarter === "All Quarters" || item.quarter === state.filters.quarter;
      const channelMatch =
        state.filters.channels.length === 0 ||
        item.channels.some((channel) => state.filters.channels.includes(channel));
      return quarterMatch && channelMatch;
    })
    .sort((left, right) => {
      if (!left.requestedDate && !right.requestedDate) {
        return left.name.localeCompare(right.name);
      }
      if (!left.requestedDate) {
        return 1;
      }
      if (!right.requestedDate) {
        return -1;
      }
      return right.requestedDate.localeCompare(left.requestedDate) || left.name.localeCompare(right.name);
    });
}

function createRequestCard(request) {
  const card = document.createElement("article");
  card.className = "request-card";
  const dueDate = request.neededBy ? formatDate(request.neededBy) : "Not set";
  const requestedOn = request.requestedDate ? formatDate(request.requestedDate) : "Not set";
  card.innerHTML = `
    <div class="request-topline">
      <span class="type-badge">New Request</span>
      <span class="channel-badge">${getChannelBadgeSummary(request.channels)}</span>
    </div>
    <h3 class="card-title">${request.name}</h3>
    <div class="request-meta-grid">
      <div class="detail-meta-item">
        <span>Requested By</span>
        <strong>${request.requestedBy}</strong>
      </div>
      <div class="detail-meta-item">
        <span>Target Quarter</span>
        <strong>${request.quarter}</strong>
      </div>
      <div class="detail-meta-item">
        <span>Requested On</span>
        <strong>${requestedOn}</strong>
      </div>
      <div class="detail-meta-item">
        <span>Needed By</span>
        <strong>${dueDate}</strong>
      </div>
    </div>
    <p class="request-notes">${request.notes || "No additional request details provided."}</p>
  `;
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", `Open request ${request.name}`);
  card.addEventListener("click", () => openRequestDetailsDialog(request.id));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openRequestDetailsDialog(request.id);
    }
  });
  return card;
}

function getDetailDateLabel(item) {
  if (item.type === "Event" && item.startDate && item.endDate) {
    return `${formatDate(item.startDate)} to ${formatDate(item.endDate)}`;
  }
  if (item.deadline) {
    return formatDate(item.deadline);
  }
  return "Not set";
}

function compareQuarterAware(left, right) {
  const leftQuarter = parseQuarterLabel(left);
  const rightQuarter = parseQuarterLabel(right);

  if (leftQuarter && rightQuarter) {
    return leftQuarter.year - rightQuarter.year || leftQuarter.quarter - rightQuarter.quarter;
  }

  return left.localeCompare(right, undefined, { numeric: true });
}

function parseQuarterLabel(value) {
  const match = /^Q([1-4])\s+(\d{4})$/i.exec(value || "");
  if (!match) {
    return null;
  }

  return {
    quarter: Number.parseInt(match[1], 10),
    year: Number.parseInt(match[2], 10),
  };
}

function getField(name) {
  return elements.form.elements.namedItem(name);
}

function getRequestField(name) {
  return elements.requestForm.elements.namedItem(name);
}

function getInitiativeById(id) {
  return state.initiatives.find((initiative) => initiative.id === id);
}

function getRequestById(id) {
  return state.requests.find((request) => request.id === id);
}

function createEmptyState(message) {
  const element = document.createElement("div");
  element.className = "empty-state";
  element.textContent = message;
  return element;
}

function createId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }
  return `initiative-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getLocalDateInputValue() {
  const today = new Date();
  const year = today.getFullYear();
  const month = `${today.getMonth() + 1}`.padStart(2, "0");
  const day = `${today.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getSuggestedTypeForRequest(request) {
  if (!request) {
    return TYPE_OPTIONS[0];
  }

  const combined = `${request.name} ${request.notes}`.toLowerCase();
  if (
    combined.includes("event") ||
    combined.includes("expo") ||
    combined.includes("conference") ||
    combined.includes("trade show")
  ) {
    return "Event";
  }

  const inferredType = inferContentType(combined);
  return inferredType === "Other Sales Collateral" ? "Strategic Initiative" : inferredType;
}

function buildDefaultGoalsHtml() {
  const themesHtml = GOALS_CONTENT.strategicThemes.map((item) => `<li>${item}</li>`).join("");
  const smartGoalsHtml = GOALS_CONTENT.smartGoals
    .map((item) => {
      const children = item.children?.length
        ? `<ul>${item.children.map((child) => `<li>${child}</li>`).join("")}</ul>`
        : "";
      return `<li>${item.title}${children}</li>`;
    })
    .join("");

  return `
    <p>${GOALS_CONTENT.intro}</p>
    <h3>Strategic Themes</h3>
    <ul>${themesHtml}</ul>
    <h3>SMART Goals</h3>
    <ul>${smartGoalsHtml}</ul>
  `.trim();
}
