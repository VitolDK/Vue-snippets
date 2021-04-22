import Vue from 'vue'

const sidePanel = {
  state: {
    panel: [],
    additionalPanel: null,
    blur: false,
    isOpen: false,
    contentBackground: ''
  },
  mutations: {
    SET_SIDE_PANEL: (state, { panel }) => {
      state.panel.push(panel)
    },
    SET_ADDITIONAL_SIDE_PANEL: (state, panel) => {
      state.additionalPanel = panel
    },
    SET_PANEL_DATA: (state, { panelData }) => {
      const level = state.panel.length - 1
      Vue.set(state.panel, level, { ...state.panel[level], ...panelData })
    },
    CLOSE_SIDE_PANEL: (state) => {
      state.panel = []
    },
    CLOSE_LAST_SIDE_PANEL: (state) => {
      if (state.panel.length !== 1) {
        state.panel.pop()
      } else {
        state.panel = []
      }
    },
    BLUR_SIDE_PANEL: (state, blur) => {
      state.blur = blur
    },
    IS_OPEN_SIDE_PANEL: (state, isOpen) => {
      state.isOpen = isOpen
      state.contentBackground = isOpen ? 'side-panel--open' : 'side-panel'
    },
    SET_PANEL_LOADING: (state, { loading }) => {
      state.panel[state.panel.length - 1].loading = loading
    }
  },
  actions: {
    checkIsOpenSidePanel({ commit, state: { panel } }) {
      const isOpen = !!Object.keys(panel)
        .map(key => panel[key])
        .filter(item => item)
        .length
      commit('IS_OPEN_SIDE_PANEL', isOpen)
    },
    checkBlurSidePanel({ commit, state: { panel } }) {
      const addBlur = !!Object.keys(panel)
        .map(key => panel[key])
        .filter(item => item)
        .filter(({ overlay }) => overlay)
        .length
      commit('BLUR_SIDE_PANEL', addBlur)
    },
    setAdditionalSidePanel({ commit }, { template, width, bind }) {
      commit('SET_ADDITIONAL_SIDE_PANEL', {
        template: template || null,
        width: width || '720px',
        bind: bind || {}
      })
    },
    closeAdditionalSidePanel({ commit }) {
      commit('SET_ADDITIONAL_SIDE_PANEL', null)
    },
    setSidePanel({ dispatch, commit }, params) {
      const {
        events = null,
        template = null,
        title = null,
        showTitle = true,
        subTitle = null,
        data = null,
        bind = null,
        noClose = false,
        noWrapper = false,
        width = '720px',
        overlay = false,
        closeAction = null,
        needScroll = true,
        slotHeader = null,
        defaultDirection = true,
        bkgClass = null,
        loading = false
      } = params
      const DefaultParams = () => ({
        events,
        template,
        title,
        subTitle,
        slotHeader,
        width,
        showTitle,
        needScroll,
        data,
        bind,
        noClose,
        overlay,
        noWrapper,
        closeAction,
        defaultDirection,
        bkgClass,
        loading
      })
      commit('SET_SIDE_PANEL', { panel: new DefaultParams() })
      dispatch('checkBlurSidePanel')
      dispatch('checkIsOpenSidePanel')
    },
    setPanelLoading({ commit, dispatch }, { loading }) {
      commit('SET_PANEL_LOADING', { loading })
    },
    closeSidePanel({ commit, dispatch }) {
      commit('CLOSE_LAST_SIDE_PANEL')
      dispatch('checkBlurSidePanel')
      dispatch('checkIsOpenSidePanel')
    },
    setPanelData({ commit, dispatch }, { panelData }) {
      commit('SET_PANEL_DATA', { panelData })
    },
    closeAllSidePanel({ commit }) {
      commit('CLOSE_SIDE_PANEL')
      commit('BLUR_SIDE_PANEL', false)
      commit('IS_OPEN_SIDE_PANEL', false)
    }
  }
}
export default sidePanel
