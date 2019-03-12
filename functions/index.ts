// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();
exports.deleteInvalidPermissions = functions.database.ref('vaults/{vaultId}').onDelete(async (change, context) => {
    const vaultId = context.params.vaultId;
    const ref = admin.database().ref('permissions');
    const relatedPermissions = admin.database().ref('/permissions').orderByChild('vault').equalTo(vaultId);
    const snapshot = await relatedPermissions.once('value');
    // create a map with all children that need to be removed
    const updates = {};
    snapshot.forEach(child => {
        updates[child.key] = null;
    });
    // execute all updates in one go and return the result to end the function
    return ref.update(updates);
});

exports.deleteInvalidCurrencies = functions.database.ref('vaults/{vaultId}').onDelete(async(change, context) => {
    const vaultId = context.params.vaultId;
    const ref = admin.database().ref('currency');
    const relatedCurrencies = admin.database().ref('/currency').orderByChild('vault').equalTo(vaultId);
    const snapshot = await relatedCurrencies.once('value');
    // create a map with all children that need to be removed
    const updates = {};
    snapshot.forEach(child => {
        updates[child.key] = null;
    });
    // execute all updates in one go and return the result to end the function
    return ref.update(updates);
});

exports.deleteInvalidDefaultValuables = functions.database.ref('edition/{editionId}').onDelete(async(change, context) => {
    const editionId = context.params.editionId;
    const ref = admin.database().ref('defaultvaluables');
    const relatedValuables = admin.database().ref('/defaultvaluables').orderByChild('edition').equalTo(editionId);
    const snapshot = await relatedValuables.once('value');
    // create a map with all children that need to be removed
    const updates = {};
    snapshot.forEach(child => {
        updates[child.key] = null;
    });
    // execute all updates in one go and return the result to end the function
    return ref.update(updates);
});

exports.deleteInvalidDefaultTreasures = functions.database.ref('edition/{editionId}').onDelete(async(change, context) => {
    const editionId = context.params.editionId;
    const ref = admin.database().ref('defaulttreasure');
    const relatedTreasures = admin.database().ref('/defaulttreasures').orderByChild('edition').equalTo(editionId);
    const snapshot = await relatedTreasures.once('value');
    // create a map with all children that need to be removed
    const updates = {};
    snapshot.forEach(child => {
        updates[child.key] = null;
    });
    // execute all updates in one go and return the result to end the function
    return ref.update(updates);
});