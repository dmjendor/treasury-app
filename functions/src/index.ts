// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

exports.deleteInvalidPermissions = functions.database.ref('vaults/{vaultId}').onDelete(async (change, context) => {
    const vaultId = context.params.vaultId;
    console.log('In Function');
    const ref = admin.database().ref('permissions');
  const relatedPermissions = admin.database().ref('/permissions').orderByChild('vault').equalTo(vaultId);
  const snapshot = await relatedPermissions.once('value');
  // create a map with all children that need to be removed
  const updates = {};
  snapshot.forEach(child => {
    console.log('Deleting '+child.key);
    updates[child.key] = null;
  });
  // execute all updates in one go and return the result to end the function
  return ref.update(updates);
});