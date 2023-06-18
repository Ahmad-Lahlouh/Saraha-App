import  bcrypt from 'bcrypt'

export const hash=(plainText,slatRound=process.env.SALTROUND)=>{

    const hashResult = bcrypt.hashSync(plainText,parseInt(slatRound))

    return hashResult
}


export const compare=(password,hashValue)=>{

    const hashResult = bcrypt.compareSync(password,hashValue)

    return hashResult
}