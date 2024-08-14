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
        const typeToMatch = `shopify://apps/sizechartpro/blocks/SizechartEmbed/${extensionId}`;
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