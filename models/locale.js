
/**
	* Locale Model
	*/

module.exports = function(sequelize, DataTypes) {

	var Locale = sequelize.define('Locale', 
		{
			latitude: DataTypes.DECIMAL,
			longitude: DataTypes.DECIMAL,
			name: DataTypes.STRING,
			timeCost: DataTypes.INTEGER,
			monetaryCost: DataTypes.INTEGER,
			description: DataTypes.STRING
		},
		{
			instanceMethods: {
			},
			associate: function(models) {
				Locale.hasOne(models.Picture, {as: "Picture"})
				Locale.hasMany(models.Review, {as: "Reviews"})
			}
		}
	);

	return Locale;
};