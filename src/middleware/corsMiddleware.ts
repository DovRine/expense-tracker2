import { NextApiRequest, NextApiResponse } from "next"

/**
 * 
 * @param req 
 * @param res 
 * @param cors  an instance of Cors()
 * @returns void
 */
function corsMiddleware(
    req: NextApiRequest,
    cors: Function,
    res?: NextApiResponse,
) {
    return new Promise((resolve, reject) => {
        cors(req, res, (result: any) => {
            if (result instanceof Error) {
                return reject(result)
            }

            return resolve(result)
        })
    })
}

export { corsMiddleware }