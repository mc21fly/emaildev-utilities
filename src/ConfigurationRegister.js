class ConfigurationRegister {
    constructor(workspace) {
        this.configuration = workspace.getConfiguration('emaildev-utilities')
    }

    get(section) {
        return this.configuration.get(section);
    }

    update(section, value) {
        this.configuration.update(section, value);
    }

    setCurrentConfiguration(configuration) {
        this.configuration = configuration;
    }
}

module.exports = ConfigurationRegister;