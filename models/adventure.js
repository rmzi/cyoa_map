
/**
	* Adventure Model
	*/

module.exports = function(sequelize, DataTypes) {

	var Adventure = sequelize.define('Adventure', 
		{
			name: DataTypes.STRING,
			description: DataTypes.STRING,
			totalTimeCost: DataTypes.INTEGER,
			totalMonetaryCost: DataTypes.INTEGER,
			rating: DataTypes.INTEGER, 				// 1 - 5
		},
		{
			instanceMethods: {
			},
			associate: function(models) {
				Adventure.hasMany(Adventure_Nodes, {as: "Nodes"})
			}
		}
	);

	return Adventure;
};