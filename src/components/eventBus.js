const eventBus = {
  events: {},

  on(event, callback) {
    this.events[event] = this.events[event] || [];
    this.events[event].push(callback);
  },

  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(...args));
    }
  }
};

export default eventBus;