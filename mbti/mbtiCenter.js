class MBTICenter {
    constructor() {
        this.mbtiOrders = {
            INTJ: ["Ni", "Te", "Fi", "Se", "Ne", "Ti", "Fe", "Si"],
            INFJ: ["Ni", "Fe", "Ti", "Se", "Ne", "Fi", "Te", "Si"],
            ENTP: ["Ne", "Ti", "Fe", "Si", "Ni", "Te", "Fi", "Se"],
            ENFP: ["Ne", "Fi", "Te", "Si", "Ni", "Fe", "Ti", "Se"],
            ENFJ: ["Fe", "Ni", "Se", "Ti", "Ne", "Fi", "Te", "Si"],
            ESFJ: ["Fe", "Si", "Ne", "Ti", "Se", "Fi", "Te", "Ni"],
            INFP: ["Fi", "Ne", "Si", "Te", "Ni", "Fe", "Ti", "Se"],
            ISFP: ["Fi", "Se", "Ni", "Te", "Si", "Fe", "Ti", "Ne"],
            INTP: ["Ti", "Ne", "Si", "Fe", "Ni", "Te", "Fi", "Se"],
            ISTP: ["Ti", "Se", "Ni", "Fe", "Si", "Te", "Fi", "Ne"],
            ENTJ: ["Te", "Ni", "Se", "Fi", "Ti", "Ne", "Si", "Fe"],
            ESTJ: ["Te", "Si", "Ne", "Fi", "Se", "Ti", "Ni", "Fe"],
            ISTJ: ["Si", "Te", "Fi", "Ne", "Se", "Ti", "Fe", "Ni"],
            ISFJ: ["Si", "Fe", "Ti", "Ne", "Se", "Fi", "Te", "Ni"],
            ESTP: ["Se", "Ti", "Fe", "Ni", "Si", "Te", "Fi", "Ne"],
            ESFP: ["Se", "Fi", "Te", "Ni", "Si", "Fe", "Ti", "Ne"]
        };
        this.selectedType = "INTJ";
        this.attributes = {
            Ti: 0,
            Te: 0,
            Ni: 0,
            Ne: 0,
            Fi: 0,
            Fe: 0,
            Si: 0,
            Se: 0
        };
        this.remainingPoints = 20;
    }

    static getInstance() {
        if (!MBTICenter.instance) {
            MBTICenter.instance = new MBTICenter();
        }
        return MBTICenter.instance;
    }

    init() {
        this.updateMBTIAttributes(this.mbtiOrders[this.selectedType]);
    }

    initEntry() {
        this.showEntryPage();
    }

    initMainPage() {
        const mbtiType = sessionStorage.getItem('mbtiType');
        const attributes = JSON.parse(sessionStorage.getItem('attributes'));

        if (mbtiType && attributes) {
            this.selectedType = mbtiType;
            this.attributes = attributes;
            this.updateMainPageAttributes(this.mbtiOrders[this.selectedType]);
        }
    }

    showEntryPage() {
        const mbtiSelector = document.getElementById('mbtiSelector');
        mbtiSelector.addEventListener('change', () => {
            this.selectedType = mbtiSelector.value;
            this.updateEntryAttributes(this.mbtiOrders[this.selectedType]);
        });
    }

    changePoints(attr, delta) {
        const currentPoints = parseInt(document.getElementById(attr.toLowerCase() + 'Points').innerText);
        if (this.remainingPoints - delta >= 0 && currentPoints + delta >= 0) {
            document.getElementById(attr.toLowerCase() + 'Points').innerText = currentPoints + delta;
            this.remainingPoints -= delta;
            document.getElementById('remainingPoints').innerText = this.remainingPoints;
            this.updatePoints(attr, currentPoints + delta);
            document.getElementById('startGame').disabled = this.remainingPoints > 0;
        }
    }

    updatePoints(attr, value) {
        const pairs = {
            F: ['Fi', 'Fe'],
            T: ['Ti', 'Te'],
            S: ['Si', 'Se'],
            N: ['Ni', 'Ne']
        };
        pairs[attr].forEach(dimension => {
            this.attributes[dimension] = value;
        });
        this.updateEntryAttributes(this.mbtiOrders[this.selectedType]);
    }

    updateEntryAttributes(order) {
        const positiveTable = [
            { id: "positive1", multiplierId: "positiveAbilityMultiplier1", frequencyId: "positiveFrequencyMultiplier1", valueId: "positiveAbilityValue1", freqValueId: "positiveFrequencyValue1", abilityMultiplier: 12, frequencyMultiplier: 3 },
            { id: "positive2", multiplierId: "positiveAbilityMultiplier2", frequencyId: "positiveFrequencyMultiplier2", valueId: "positiveAbilityValue2", freqValueId: "positiveFrequencyValue2", abilityMultiplier: 9, frequencyMultiplier: 3 },
            { id: "positive3", multiplierId: "positiveAbilityMultiplier3", frequencyId: "positiveFrequencyMultiplier3", valueId: "positiveAbilityValue3", freqValueId: "positiveFrequencyValue3", abilityMultiplier: 6, frequencyMultiplier: 3 },
            { id: "positive4", multiplierId: "positiveAbilityMultiplier4", frequencyId: "positiveFrequencyMultiplier4", valueId: "positiveAbilityValue4", freqValueId: "positiveFrequencyValue4", abilityMultiplier: 3, frequencyMultiplier: 3 }
        ];

        const negativeTable = [
            { id: "negative1", multiplierId: "negativeAbilityMultiplier1", frequencyId: "negativeFrequencyMultiplier1", valueId: "negativeAbilityValue1", freqValueId: "negativeFrequencyValue1", abilityMultiplier: 8, frequencyMultiplier: 1 },
            { id: "negative2", multiplierId: "negativeAbilityMultiplier2", frequencyId: "negativeFrequencyMultiplier2", valueId: "negativeAbilityValue2", freqValueId: "negativeFrequencyValue2", abilityMultiplier: 6, frequencyMultiplier: 1 },
            { id: "negative3", multiplierId: "negativeAbilityMultiplier3", frequencyId: "negativeFrequencyMultiplier3", valueId: "negativeAbilityValue3", freqValueId: "negativeFrequencyValue3", abilityMultiplier: 4, frequencyMultiplier: 1 },
            { id: "negative4", multiplierId: "negativeAbilityMultiplier4", frequencyId: "negativeFrequencyMultiplier4", valueId: "negativeAbilityValue4", freqValueId: "negativeFrequencyValue4", abilityMultiplier: 2, frequencyMultiplier: 1 }
        ];

        order.forEach((attr, index) => {
            const table = index < 4 ? positiveTable : negativeTable;
            const row = table[index % 4];
            const abilityMultiplier = row.abilityMultiplier;
            const frequencyMultiplier = row.frequencyMultiplier;
            const abilityValue = this.attributes[attr] * abilityMultiplier;
            const frequencyValue = this.attributes[attr] * frequencyMultiplier;

            document.getElementById(row.id).innerText = attr;
            document.getElementById(row.multiplierId).innerText = abilityMultiplier;
            document.getElementById(row.frequencyId).innerText = frequencyMultiplier;
            document.getElementById(row.valueId).innerText = abilityValue;
            document.getElementById(row.freqValueId).innerText = frequencyValue;
        });
    }

    updateMainPageAttributes(order) {
        const positiveTable = [
            { id: "positive1", multiplierId: "positiveAbilityMultiplier1", frequencyId: "positiveFrequencyMultiplier1", valueId: "positiveAbilityValue1", freqValueId: "positiveFrequencyValue1", abilityMultiplier: 12, frequencyMultiplier: 3 },
            { id: "positive2", multiplierId: "positiveAbilityMultiplier2", frequencyId: "positiveFrequencyMultiplier2", valueId: "positiveAbilityValue2", freqValueId: "positiveFrequencyValue2", abilityMultiplier: 9, frequencyMultiplier: 3 },
            { id: "positive3", multiplierId: "positiveAbilityMultiplier3", frequencyId: "positiveFrequencyMultiplier3", valueId: "positiveAbilityValue3", freqValueId: "positiveFrequencyValue3", abilityMultiplier: 6, frequencyMultiplier: 3 },
            { id: "positive4", multiplierId: "positiveAbilityMultiplier4", frequencyId: "positiveFrequencyMultiplier4", valueId: "positiveAbilityValue4", freqValueId: "positiveFrequencyValue4", abilityMultiplier: 3, frequencyMultiplier: 3 }
        ];

        const negativeTable = [
            { id: "negative1", multiplierId: "negativeAbilityMultiplier1", frequencyId: "negativeFrequencyMultiplier1", valueId: "negativeAbilityValue1", freqValueId: "negativeFrequencyValue1", abilityMultiplier: 8, frequencyMultiplier: 1 },
            { id: "negative2", multiplierId: "negativeAbilityMultiplier2", frequencyId: "negativeFrequencyMultiplier2", valueId: "negativeAbilityValue2", freqValueId: "negativeFrequencyValue2", abilityMultiplier: 6, frequencyMultiplier: 1 },
            { id: "negative3", multiplierId: "negativeAbilityMultiplier3", frequencyId: "negativeFrequencyMultiplier3", valueId: "negativeAbilityValue3", freqValueId: "negativeFrequencyValue3", abilityMultiplier: 4, frequencyMultiplier: 1 },
            { id: "negative4", multiplierId: "negativeAbilityMultiplier4", frequencyId: "negativeFrequencyMultiplier4", valueId: "negativeAbilityValue4", freqValueId: "negativeFrequencyValue4", abilityMultiplier: 2, frequencyMultiplier: 1 }
        ];

        order.forEach((attr, index) => {
            const table = index < 4 ? positiveTable : negativeTable;
            const row = table[index % 4];
            const abilityMultiplier = row.abilityMultiplier;
            const frequencyMultiplier = row.frequencyMultiplier;
            const abilityValue = this.attributes[attr] * abilityMultiplier;
            const frequencyValue = this.attributes[attr] * frequencyMultiplier;

            document.getElementById(row.id).innerText = attr;
            document.getElementById(row.multiplierId).innerText = abilityMultiplier;
            document.getElementById(row.frequencyId).innerText = frequencyMultiplier;
            document.getElementById(row.valueId).innerText = abilityValue;
            document.getElementById(row.freqValueId).innerText = frequencyValue;
        });
    }

    setAttribute(attr, value) {
        if (this.attributes.hasOwnProperty(attr)) {
            this.attributes[attr] = value;
            this.updateMainPageAttributes(this.mbtiOrders[this.selectedType]);
        }
    }
}

const instance = MBTICenter.getInstance();
export { instance as MBTICenter };
