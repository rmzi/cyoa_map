
/**
	* Review Model
	*/

module.exports = function(sequelize, DataTypes) {

	var Review = sequelize.define('Review', 
		{
			text: DataTypes.STRING			
		},
		{
			instanceMethods: {
			},
			associate: function(models) {
				Review.belongsTo(User)
				Review.belongsTo(Locale)
			}
		}
	);

	return Review;
};