const FourQuadrantValues = {
    重要紧急: 'important-urgency',
    不重要紧急: 'not-important-urgency',
    重要不紧急: 'important-not-urgency',
    不重要不紧急: 'not-important-not-urgency'
};

const AgentMatterState = {
    待完成: 0,
    已关闭: 1,
    已完成: 2
};

const ComponentSize = {
    小: 'small',
    中: 'middle',
    大: 'large'
};

const CloseSystemType = {
    系统提示: 'default',
    最小化到系统托盘: 'minimize',
    退出系统: 'out'
}

const exportArr = [
    FourQuadrantValues,
    AgentMatterState,
    ComponentSize,
    CloseSystemType
];

// 冻结对象不让修改
exportArr.forEach(item => {
    Object.freeze(item);
});

export {
    FourQuadrantValues,
    AgentMatterState,
    ComponentSize,
    CloseSystemType
}