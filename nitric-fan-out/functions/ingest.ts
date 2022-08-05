import api from '../resources/public-api';
import tenant from '../resources/tenant';
import short from 'short-uuid';
import staging from '../resources/staging-bucket';
import jwt from 'jsonwebtoken';


const stagingBucket = staging.for('writing');
const tenants = tenant.for('reading');

api.put('/tenants/:tenantid', async ({req, res}) => {
    const { tenantid } = req.params;

    try {
        console.log(req.headers)
        const authHeader = (req.headers['authorization'] as string).replace("Bearer ", "")
        const ten = await tenants.doc(tenantid).get()

        console.log(authHeader)

        // validate request was signed for this tenant
        jwt.verify(authHeader, ten.publicKey)
    } catch (e) {
        console.log(e);
        res.status = 401
        res.body = "Unauthorized"
        return
    }
   
    // Check auth header
    const fileId = short.generate()
    const uploadUrl = await stagingBucket.file(`${tenantid}/${fileId}`).getUploadUrl();

    res.headers['Location'] = [uploadUrl]
    res.status = 307
});