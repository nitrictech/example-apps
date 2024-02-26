import short from "short-uuid";
import api from "../resources/public-api";
import tenant from "../resources/tenant";
import keypair from "keypair";

const writableTenants = tenant.for("setting", "getting");

// create a new tenant
api.post("/tenants", async ({ req, res }) => {
  // generate a new id for this tenant
  const tenantId = short.generate();

  const { name } = req.json();

  const pairs = keypair({
    bits: 512,
  });

  if (!name) {
    res.status = 400;
    res.body = "name must be provided";
    return;
  }

  const tenants = await writableTenants.get("tenants");

  await writableTenants.set("tenants", [
    ...tenants,
    {
      id: tenantId,
      name,
      publicKey: pairs.public,
    },
  ]);

  res.status = 200;
  res.json({
    id: tenantId,
    key: pairs.private,
  });
});
