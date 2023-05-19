/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("users", function (table) {
		table.increments("id").primary();
		table.string("fullname", 100).notNullable();
		table.string("email", 155).notNullable().unique();
		table.integer("phone", 15).notNullable().unique();
		table.text("password");
		table.timestamps(true, true);
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable("users");
};
