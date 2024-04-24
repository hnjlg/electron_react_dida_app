const fourQuadrantValues = {
    重要紧急: 'important-urgency',
    不重要紧急: 'not-important-urgency',
    重要不紧急: 'important-not-urgency',
    不重要不紧急: 'not-important-not-urgency'
}

const AgentMatterState = {
    待完成: 0,
    已关闭: 1,
    已完成: 2
}

// 冻结对象不让修改
Object.freeze(fourQuadrantValues);
Object.freeze(AgentMatterState);

export {
    fourQuadrantValues,
    AgentMatterState
}