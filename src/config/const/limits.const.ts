export type PremiumLevel = 0 | 1 | 2 | number

export type NotterLimits = {
    documents: number
    publicDocuments: number
    uploadMb: number
}

export type TodoLimits = {
    boards: number | string
    publicBoards: number | string
    badge: boolean
    activityAudit: boolean
    customBackgrounds: boolean
    exportImportBoards: boolean
    exportLogs: boolean
}

export type PlanLimits = {
    documents: number
    publicDocuments: number
    uploadMb: number
    todo: TodoLimits
}

export const FREE_LIMITS: PlanLimits = {
    documents: 75,
    publicDocuments: 10,
    uploadMb: 1,
    todo: {
        boards: 5,
        publicBoards: 3,
        badge: false,
        activityAudit: false,
        customBackgrounds: false,
        exportImportBoards: false,
        exportLogs: false,
    },
}

export const AMBER_PERSONAL_LIMITS: PlanLimits = {
    documents: 200,
    publicDocuments: 100,
    uploadMb: 3,
    todo: {
        boards: 25,
        publicBoards: 25,
        badge: true,
        activityAudit: true,
        customBackgrounds: true,
        exportImportBoards: false,
        exportLogs: false,
    },
}

export const AMBER_TEAM_LIMITS: PlanLimits = {
    documents: 500,
    publicDocuments: 250,
    uploadMb: 3,
    todo: {
        boards: 50,
        publicBoards: 50,
        badge: true,
        activityAudit: true,
        customBackgrounds: true,
        exportImportBoards: false,
        exportLogs: false,
    },
}

export const DIAMOND_LIMITS: PlanLimits = {
    documents: 1000,
    publicDocuments: 1000,
    uploadMb: 10,
    todo: {
        boards: "Неограниченно",
        publicBoards: 100,
        badge: true,
        activityAudit: true,
        customBackgrounds: true,
        exportImportBoards: true,
        exportLogs: true,
    },
}

