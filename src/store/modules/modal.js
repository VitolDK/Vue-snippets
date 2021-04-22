const DEFAULT_SIZE = {
  small: 460,
  default: 600,
  large: 800
}

const DEFAULT_POSITION = {
  top: 'top',
  center: 'center',
  bottom: 'bottom'
}

const modal = {
  state: {
    template: null,
    title: null,
    subtitle: null,
    width: null,
    data: null,
    bind: null,
    events: null,
    noClose: false,
    open: false,
    backdrop: true,
    borderless: false,
    custom: false,
    position: false
  },
  mutations: {
    WIDTH_MODAL: (state, width) => {
      state.width = width
    },
    TEMPLATE_MODAL: (state, template) => {
      state.template = template
    },
    TITLE_MODAL: (state, title) => {
      state.title = title
    },
    EVENTS_MODAL: (state, events) => {
      state.events = events
    },
    BIND_MODAL: (state, bind) => {
      state.bind = bind
    },
    SUBTITLE_MODAL: (state, subtitle) => {
      state.subtitle = subtitle
    },
    DATA_MODAL: (state, data) => {
      state.data = data
    },
    OPEN_MODAL: (state) => {
      state.open = true
    },
    POSITION: (state, position) => {
      state.position = position
    },
    CLOSE_MODAL: (state) => {
      state.open = false
    },
    NO_CLOSE_MODAL: (state, noClose) => {
      state.noClose = noClose
    },
    BACKDROP_MODAL: (state, backdrop) => {
      state.backdrop = backdrop
    },
    BORDERLESS_MODAL: (state, borderless) => {
      state.borderless = borderless
    },
    CUSTOM_MODAL: (state, custom) => {
      state.custom = custom
    }
  },
  actions: {
    setModal(
      { commit, state: { open }, dispatch },
      { template, title, custom, subTitle, data, noClose, events, bind, size = DEFAULT_SIZE.default, positionRelative = null, borderless, position = DEFAULT_POSITION.center }
    ) {
      dispatch('sizeModal', { size, positionRelative, position })
      commit('NO_CLOSE_MODAL', !!noClose)
      commit('TITLE_MODAL', title)
      commit('SUBTITLE_MODAL', subTitle || null)
      commit('DATA_MODAL', data || {})
      commit('TEMPLATE_MODAL', template || null)
      commit('EVENTS_MODAL', events || null)
      commit('BIND_MODAL', bind || null)
      commit('BORDERLESS_MODAL', borderless || false)
      commit('CUSTOM_MODAL', borderless ? false : custom || false)
      !open && dispatch('openModal')
    },
    sizeModal({ commit }, { size, positionRelative, position }) {
      const backdrop = !positionRelative
      // const bodyWidth = document.body.offsetWidth
      const modalPosition = DEFAULT_POSITION[position] || DEFAULT_POSITION.center
      const modalWidth = DEFAULT_SIZE[size] || DEFAULT_SIZE.default
      commit('WIDTH_MODAL', `${modalWidth}px`)
      commit('BACKDROP_MODAL', backdrop)
      commit('POSITION', modalPosition)
    },
    openModal({ commit }) {
      commit('OPEN_MODAL')
    },
    closeModal({ commit }) {
      commit('CLOSE_MODAL')
    }
  }
}

export default modal
