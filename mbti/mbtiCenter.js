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
    selectedType: "",
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
        this.showMBTIModal();
    },

    showMBTIModal() {
        const modal = document.getElementById('mbtiModal');
        modal.style.display = 'block';

        document.getElementById('confirmMBTI').addEventListener('click', () => {
            const selectedType = document.getElementById('mbtiSelector').value;
            this.selectedType = selectedType;
            this.distributePoints(this.mbtiOrders[selectedType]);
            this.updateMBTIAttributes(this.mbtiOrders[selectedType]);
            modal.style.display = 'none';
        });
    },

    distributePoints(order) {
        let points = 20;
        const values = Array(order.length).fill(0);

        for (let i = 0; i < values.length && points > 0; i++) {
            values[i] = Math.min(5, points);
            points -= values[i];
        }

        for (let i = 0; i < order.length; i++) {
            this.attributes[order[i]] = values[i];
        }
    },

    updateMBTIAttributes(order) {
        const mbtiAttrList = document.querySelector('.mbtiAttrList');
        mbtiAttrList.innerHTML = ''; // 清空现有的列表

        order.forEach(attr => {
            const li = document.createElement('li');
            li.className = `mbtiLi attr_${attr.toLowerCase()}`;
            li.textContent = `${attr}: ${this.attributes[attr]}`;
            mbtiAttrList.appendChild(li);
        });
    },

    //TODO:对外提供的接口
    setAttribute(attr, value) {
        if (this.attributes.hasOwnProperty(attr)) {
            this.attributes[attr] = value;
            this.updateMBTIAttributes(this.mbtiOrders[this.selectedType]);
        }
    }
};

// 暴露初始化方法
export default MBTICenter;
