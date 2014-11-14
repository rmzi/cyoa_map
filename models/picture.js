
/**
	* Picture Model
	*/

module.exports = function(sequelize, DataTypes) {

	var Picture = sequelize.define('Picture', 
		{
			url: DataTypes.STRING,
			description: DataTypes.STRING,
		},
		{
			instanceMethods: {
			},
			associate: function(models) {
				Picture.belongsTo(models.User)
				Picture.belongsTo(models.Locale)
			}
		}
	);

	return Picture;
};