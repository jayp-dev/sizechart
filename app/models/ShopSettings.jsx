import db from "../db.server";

// export async function ShopSettings(params) {

// }

export async function getShopFromRequestSettings(session) {
    const existingSettings = await db.shopSettings.findUnique({
        where: { ShopId: session.id },
    });
    if (!existingSettings) {
        const shopsettings = await db.shopSettings.create({
            data: {
                ShopId: session.id,
                sizeGuideTitle: 'Sizing Information',
                ChartIconId: 10,
                headerColor: "{\"hue\":200,\"brightness\":0.71923828125,\"saturation\":0.945703125}",
                headerFontColor: "{\"hue\":150,\"brightness\":0.73173828125,\"saturation\":0.874609375}",
                zebraLinesColor: "{\"hue\":100,\"brightness\":0.81923828125,\"saturation\":0.759765625}",
                focusColor: "{\"hue\":300,\"brightness\":0.73798828125,\"saturation\":0.932421875}",
            },
        });

        return shopsettings;
    }

    return existingSettings;
}

export async function ShopSettingUpdate(session, data) {
    const existingSettings = await db.shopSettings.findUnique({
        where: { ShopId: session.id },
    });

    if (existingSettings) {
        const updatedSettings = await db.shopSettings.update({
            where: { ShopId: session.id },
            data: {
                sizeGuideTitle: data.sizeGuideTitle,
                ChartIconId: Number(data.ChartIconId),
                borderStyle: data.borderStyle ? data.borderStyle : "tunnel",
                customCss: data.customCss ? data.customCss : '',
                SizePlacement: data.SizePlacement ? data.SizePlacement : 'inline',
                headerColor: typeof data.headerColor === 'string' ? data.headerColor : existingSettings.headerColor,
                headerFontColor: typeof data.headerFontColor === 'string' ? data.headerFontColor : existingSettings.headerFontColor,
                zebraLinesColor: typeof data.zebraLinesColor === 'string' ? data.zebraLinesColor : existingSettings.zebraLinesColor,
                focusColor: typeof data.focusColor === 'string' ? data.focusColor : existingSettings.focusColor,
            },
        });
        return updatedSettings;
    }
    return null;
}


// export async function ShopSettingUpdate(session, data) {
//     try {
//         const existingSettings = await db.shopSettings.findUnique({
//             where: { ShopId: session.id },
//         });

//         if (existingSettings) {
//             const updatedSettings = await db.shopSettings.update({
//                 where: { ShopId: session.id },
//                 data: {
//                     sizeGuideTitle: data.sizeGuideTitle,
//                     ChartIconId: Number(data.ChartIconId),
//                     borderStyle: data.borderStyle ? data.borderStyle : "tunnel",
//                     customCss: data.customCss ? data.customCss : '',
//                     SizePlacement: data.SizePlacement ? data.SizePlacement : 'inline',
//                     headerColor: typeof data.headerColor === 'string' ? data.headerColor : existingSettings.headerColor,
//                     headerFontColor: typeof data.headerFontColor === 'string' ? data.headerFontColor : existingSettings.headerFontColor,
//                     zebraLinesColor: typeof data.zebraLinesColor === 'string' ? data.zebraLinesColor : existingSettings.zebraLinesColor,
//                     focusColor: typeof data.focusColor === 'string' ? data.focusColor : existingSettings.focusColor,
//                 },
//             });
//             return updatedSettings;
//         }
//         return null;
//     } catch (error) {
//         console.error('Error updating shop settings:', error);
//         throw error; // or handle error as needed
//     }
// }
