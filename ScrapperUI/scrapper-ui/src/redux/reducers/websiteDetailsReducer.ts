export interface websiteDetails {
    id: string
    displayName?: string
    url?: string
    websiteDetailsMD?: string
    shortSummary?: string
    status?: string
    createdOn?: number
    updatedOn?: number
}

export interface webSiteDetailsWithStatus {
    websiteDetails: websiteDetails
    status: "UNCHANGED" | "UPDATED"
}

export interface websiteReducerState {
    allWebsites: Record<string, webSiteDetailsWithStatus>
}

interface addWebsiteDetails {
    type: "ADD_WEBSITE_DETAILS",
    payload: {
        siteDetails: websiteDetails
    }
}

interface updateWebsiteDetails {
    type: "UPDATE_WEBSITE_DETAILS",
    payload: {
        id: string
        item: string
        value: string | boolean | number
    }
}

interface deleteWebsiteDetails {
    type: "DELETE_WEBSITE_DETAILS",
    payload: {
        id: string
    }
}

const initialState: websiteReducerState = {
    allWebsites: {}
};

export type actions = addWebsiteDetails | updateWebsiteDetails | deleteWebsiteDetails;

const websiteDetailsReducer = (state = initialState, action: actions): websiteReducerState => {
    switch (action.type) {
        case "ADD_WEBSITE_DETAILS": {
            const siteDetails = action.payload.siteDetails;
            return {
                ...state,
                allWebsites: {
                    ...state?.allWebsites,
                    [siteDetails?.id]: {
                        websiteDetails: siteDetails,
                        status: "UNCHANGED"
                    }
                }
            };
        }

        case "UPDATE_WEBSITE_DETAILS": {
            const id = action.payload.id
            const item = action.payload.item;
            const value = action.payload.value;
            return {
                ...state,
                allWebsites: {
                    ...state.allWebsites,
                    [id]: {
                        ...state?.allWebsites?.[id],
                        status: "UPDATED",
                        websiteDetails: {
                            ...state?.allWebsites?.[id]?.websiteDetails,
                            [item]: value
                        }
                    }
                }
            }
        }
        case "DELETE_WEBSITE_DETAILS": {
            const id = action?.payload?.id
            delete state?.allWebsites?.[id]
            return {
                ...state,
            }
        }
        default:
            return state;
    }
};

export default websiteDetailsReducer;
