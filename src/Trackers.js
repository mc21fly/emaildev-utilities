const Tracker = require("./Tracker");

class Trackers {
    constructor() {
        this.trackers = [];
    }

    add() {
        this.trackers.push(new Tracker);
    }

    set(tables) {
        this.trackers.forEach((tracker, index) => tracker.track(tables[index]));
    }

    disposeAll() {
        this.trackers.forEach(tracker => tracker.dispose());
    }
}

module.exports = Trackers;