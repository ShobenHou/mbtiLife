import { MBTICenter } from './mbtiCenter.js';

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('startGame').addEventListener('click', () => {
        if (MBTICenter.remainingPoints > 0) {
            alert('请分配完所有点数');
            return;
        }
        sessionStorage.setItem('mbtiType', MBTICenter.selectedType);
        sessionStorage.setItem('attributes', JSON.stringify(MBTICenter.attributes));
        window.location.href = '../index.html';
    });

    // 将 changePoints 方法挂载到 window 对象上
    window.changePoints = MBTICenter.changePoints.bind(MBTICenter);

    MBTICenter.initEntry();
});
