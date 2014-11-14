
/**
	* User Model
	*/

module.exports = function(sequelize, DataTypes) {

	var User = sequelize.define('User', 
		{
			name: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			moneyToSpend: DataTypes.INTEGER,	// in Dollars ($)
			timeToSpend: DataTypes.INTEGER, 	// in Minutes 
			sex: DataTypes.STRING 				// M / F
		},
		{
			instanceMethods: {
			},
			associate: function(models) {
				User.hasMany(models.Picture, {as: "Pictures"});
				User.hasMany(models.Review, {as: "Reviews"});
				User.hasMany(models.User, {as : "Friends"});
			}
		}
	);

	return User;
};