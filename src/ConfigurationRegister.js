class ConfigurationRegister {
	constructor(workspace) {
		this.configuration = workspace.getConfiguration('emaildev-utilities');
	}

	get(section) {
		return this.configuration.get(section);
	}

	update(section, value) {
		this.configuration.update(section, value);
	}

	toggle(section) {
		this.update(section, !this.get(section));
	}

	setCurrentConfiguration(workspace) {
		this.configuration = workspace.getConfiguration('emaildev-utilities');
	}
}

module.exports = ConfigurationRegister;
