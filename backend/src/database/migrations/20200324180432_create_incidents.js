exports.up = function(knex) {
  return knex.schema.createTable("TBCASE001", function(table) {
    table.increments("CODCASE");
    table.string("CODONG", 10).notNullable();

    table.string("TITLE", 50).notNullable();
    table.string("DESCRIPTION", 255).notNullable();
    table.decimal("VALUE", 18).notNullable();

    table
      .foreign("CODONG")
      .references("CODONG")
      .inTable("TBONGS001");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("TBCASE001");
};
