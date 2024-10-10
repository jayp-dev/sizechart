import db from '../db.server';
export async function GetWelscreenData() {
    const response = await db.welcomeScreen.findMany();
    if (!response) {
        return null;
    }
    return response;

}

export async function GetAppEnable(admin, session, extensionId) {
    let DataTheme = null;
    try {
        const themes = await admin.rest.resources.Theme.all({
            session: session,
        });
        const currentTheme = themes.data.find(theme => theme.role === 'main');

        DataTheme = await admin.rest.resources.Asset.all({
            session: session,
            theme_id: currentTheme.id,
            asset: { "key": "config/settings_data.json" },
        });
        if (!DataTheme) {
            return null;
        }
        DataTheme = JSON.parse(DataTheme.data[0].value);
        DataTheme = DataTheme.current.blocks;
        const typeToMatch = `shopify://apps/pti-size-chart-pro/blocks/SizechartEmbed/${extensionId}`;
        const matchType = (type) => {
            return Object.values(DataTheme).some(item => item.type === type && !item.disabled);
        };
        const AppEnable = matchType(typeToMatch);

        return AppEnable;
    } catch (error) {
        console.error("Error fetching asset:", error);
        return ("Error fetching asset:", error);
    }

}

export async function AppEnableDisable(admin, session, data) {
    // this code is not working 
    const EnableDisable = data.EmbedApp === 'true' ? true : false;
    let DataTheme = null;
    try {
        const themes = await admin.rest.resources.Theme.all({
            session: session,
        });
        const currentTheme = themes.data.find(theme => theme.role === 'main');
        if (!currentTheme) {
            throw new Error("No main theme found");
        }

        DataTheme = await admin.rest.resources.Asset.all({
            session: session,
            theme_id: currentTheme.id,
            asset: { "key": "config/settings_data.json" },
        });

        if (!DataTheme) {
            throw new Error("Failed to fetch `settings_data.json`");
        }
        DataTheme = JSON.parse(DataTheme.data[0].value);

        let blockFound = false;

        for (const blockKey in DataTheme.current.blocks) {
            const block = DataTheme.current.blocks[blockKey];

            if (block.type.includes('pti-size-chart-pro/blocks/SizechartEmbed')) {
                block.disabled = EnableDisable;
                block.settings = {
                    ...block.settings
                };
                blockFound = true;

                break; // Exit the loop once the block is found and updated
            }
        }

        if (!blockFound) {
            throw new Error("No block found with type 'pti-size-chart-pro'");
        }
        const updatedSettingsData = DataTheme;
        const asset = new admin.rest.resources.Asset({ session: session });
        asset.theme_id = currentTheme.id
        asset.key = 'config/settings_data.json';
        asset.value = updatedSettingsData;
        const response = await asset.save({
            update: true,
        });

        if (response.errors) {
            throw new Error(`Failed to update settings_data.json: ${JSON.stringify(response.errors)}`);
        }

        return { success: true, message: "Settings updated successfully.", response };
    } catch (error) {
        console.error("Error fetching asset:", error);
        return {
            success: false,
            error: "Error during app enable/disable",
            details: error.message || error, // Ensure error details are captured correctly
            stack: error.stack // Optionally return the error stack trace for more debugging info
        };

    }
}




export async function Getstarted(session, isAppEnable) {
    const Existingsession = await db.session.findUnique({ where: { id: session.id } });
    if (Existingsession.id) {
        const welcomeScreenWithSession = await db.welcomeScreen.findUnique({
            where: { sessionId: Existingsession.id },
        });
        if (welcomeScreenWithSession != null) {
            return welcomeScreenWithSession;
        }
        const newWelcomeScreen = await db.welcomeScreen.create({
            data: {
                EmbedApp: isAppEnable === 'true',
                GettingStart: true,
                sessionId: Existingsession.id, // Ensure this sessionId exists in Session table
            },
        });
        return newWelcomeScreen;
    }
    return null;
}


export async function updatewelcomescreen(data) {
    if (data.sessionId) {
        const findshop = await db.welcomeScreen.findUnique({ where: { sessionId: data.sessionId } });
        if (findshop != null) {
            const update = await db.welcomeScreen.update({
                where: { sessionId: findshop.sessionId },
                data: {
                    EmbedApp: data.EmbedApp === "true",
                    GettingStart: data.GettingStart === "true",
                }
            })
            return update;
        }
        return null;
    }
}


export async function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            resolve(reader.result);
        };

        reader.onerror = (error) => {
            reject(error);
        };

        reader.readAsDataURL(file);
    });
}
