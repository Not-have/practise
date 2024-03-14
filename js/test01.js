function changeUserField(field, user, changeAmount) {
    user[field] = user[field] + changeAmount || changeAmount;
}

const user = {};
console.log(user);
changeUserField("credits", user, 5);
changeUserField("credits", user, -1);
changeUserField("credits", user, -1);
changeUserField("credits", user, -1);
changeUserField("credits", user, -1);
changeUserField("credits", user, -1);

console.log(user); // { credits: -1 }