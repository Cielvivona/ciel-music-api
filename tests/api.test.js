import test from "node:test";
import assert from "node:assert/strict";

const BASE_URL = "http://127.0.0.1:3000";

test("La página principal funciona", async () => {
  const respuesta = await fetch(BASE_URL);
  assert.equal(respuesta.status, 200);

  const datos = await respuesta.json();
  assert.equal(datos.estado, "Funcionando");
});

test("Listar artistas devuelve un resultado válido", async () => {
  const respuesta = await fetch(`${BASE_URL}/api/db/artistas`);
  assert.equal(respuesta.status, 200);

  const datos = await respuesta.json();
  assert.ok(Array.isArray(datos.artistas));
});

test("La paginación inválida devuelve error 400", async () => {
  const respuesta = await fetch(
    `${BASE_URL}/api/db/artistas?page=0`
  );

  assert.equal(respuesta.status, 400);
});

test("Crear artista sin token devuelve error 401", async () => {
  const respuesta = await fetch(`${BASE_URL}/api/db/artistas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nombre: "Artista de prueba"
    })
  });

  assert.equal(respuesta.status, 401);
});

test("MusicBrainz sin nombre devuelve error 400", async () => {
  const respuesta = await fetch(`${BASE_URL}/api/artistas`);

  assert.equal(respuesta.status, 400);
});
