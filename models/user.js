
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
				//User.hasMany(models.Picture);
				//User.hasMany(models.Review);
				User.hasMany(models.User, {as : "friends"});
			}
		}
	);

	return User;
};