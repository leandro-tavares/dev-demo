exports.up = function(knex) {
  return knex.schema.createTable("TBONGS001", function(table) {
    table.string("CODONG", 10).primary();
    table.string("NAME", 50).notNullable();
    table.string("EMAIL", 100).notNullable();
    table.string("WHATSAPP", 15).notNullable();
    table.string("CITY", 50).notNullable();
    table.string("UF", 2).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("TBONGS001");
};
