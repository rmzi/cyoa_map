
/**
	* Friends_With Relationship Model
	*/

module.exports = function(sequelize, DataTypes) {

	var FriendsWith = sequelize.define('FriendsWith', 
		{
			url: DataTypes.STRING,
			description: DataTypes.STRING,
		},
		{
			instanceMethods: {
			},
			associate: function(models) {
			}
		}
	);

	return FriendsWith;
};