let MBTICenter = {
    mbtiOrders: {
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
    },
    selectedType: "INTJ",
    attributes: {
        Ti: 0,
        Te: 0,
        Ni: 0,
        Ne: 0,
        Fi: 0,
        Fe: 0,
        Si: 0,
        Se: 0
    },
    init() {
        this.updateMBTIAttributes(this.mbtiOrders[this.selectedType]);
    },
    initEntry() {
        this.showEntryPage();
    },
    showEntryPage() {
        const mbtiSelector = document.getElementById('mbtiSelector');
        mbtiSelector.addEventListener('change', () => {
            this.selectedType = mbtiSelector.value;
            this.updateEntryAttributes(this.mbtiOrders[this.selectedType]);
        });

        document.getElementById('startGame').addEventListener('click', () => {
            if (remainingPoints > 0) {
                alert('请分配完所有点数');
                return;
            }
            sessionStorage.setItem('mbtiType', this.selectedType);
            sessionStorage.setItem('attributes', JSON.stringify(this.attributes));
            window.location.href = 'index.html';
        });
    },
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
    },
    updateEntryAttributes(order) {
        const mbtiAttrList = document.querySelector('.mbtiAttrList');
        mbtiAttrList.innerHTML = ''; // 清空现有的列表

        order.forEach((attr, index) => {
            const isPositive = index < 4;
            const abilityMultiplier = isPositive ? [12, 9, 6, 3][index] : [8, 6, 4, 2][index - 4];
            const frequencyMultiplier = isPositive ? 3 : 1;

            const abilityValue = this.attributes[attr] * abilityMultiplier;
            const frequencyValue = this.attributes[attr] * frequencyMultiplier;

            const li = document.createElement('li');
            li.className = `mbtiLi attr_${attr.toLowerCase()}`;
            li.innerHTML = `${attr}: ${this.attributes[attr]} <br> 能力倍率: ${abilityMultiplier} <br> 频率倍率: ${frequencyMultiplier} <br> 能力值: ${abilityValue} <br> 频率值: ${frequencyValue}`;
            mbtiAttrList.appendChild(li);
        });
    },
    updateMBTIAttributes(order) {
        const mbtiAttrList = document.querySelector('.mbtiAttrList');
        mbtiAttrList.innerHTML = ''; // 清空现有的列表

        order.forEach((attr, index) => {
            const isPositive = index < 4;
            const abilityMultiplier = isPositive ? [12, 9, 6, 3][index] : [8, 6, 4, 2][index - 4];
            const frequencyMultiplier = isPositive ? 3 : 1;

            const abilityValue = this.attributes[attr] * abilityMultiplier;
            const frequencyValue = this.attributes[attr] * frequencyMultiplier;

            const li = document.createElement('li');
            li.className = `mbtiLi attr_${attr.toLowerCase()}`;
            li.innerHTML = `${attr}: ${this.attributes[attr]} <br> 能力值: ${abilityValue} <br> 频率值: ${frequencyValue}`;
            mbtiAttrList.appendChild(li);
        });
    },
    setAttribute(attr, value) {
        if (this.attributes.hasOwnProperty(attr)) {
            this.attributes[attr] = value;
            this.updateMBTIAttributes(this.mbtiOrders[this.selectedType]);
        }
    }
};

// 暴露初始化方法
//export default MBTICenter;
