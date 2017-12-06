from protorpc import messages
from protorpc import message_types

class MessageNone(messages.Message):
    inti = messages.StringField(1)
# Input messages
#Recibe el token para validar
class Token(messages.Message):
    tokenint = messages.StringField(1, required=True)
    #entityKey = messages.StringField(2, required=False)
    #fromurl = messages.StringField(3)

#Recibe el token y un entityKey de cualquier base de datos para validar
class TokenKey(messages.Message):
    tokenint = messages.StringField(1, required=True)
    entityKey = messages.StringField(2, required=True)
    #fromurl = messages.StringField(3)

#Recibe el token y un entityKey de cualquier base de datos para validar
class TokenKeyCloset(messages.Message):
    tokenint = messages.StringField(1, required=True)
    closet_key = messages.StringField(2, required=True)


#Recibe el email y contrasena para la creacion de token
class EmailPasswordMessage(messages.Message):
    email = messages.StringField(1, required=True)
    password = messages.StringField(2, required=True)

# Output messages
#regresa un token
class TokenMessage(messages.Message):
    code = messages.IntegerField(1)
    message = messages.StringField(2)
    token = messages.StringField(3)
    entityKey = messages.StringField(4)

#regresa mensajes de lo ocurrido
class CodeMessage(messages.Message):
    code = messages.IntegerField(1)
    message = messages.StringField(2)

#USERS email', 'password', 'nombre', 'talla', 'edad', 'urlImage'
class UserInput(messages.Message):
    token = messages.StringField(1)
    empresa_key = messages.StringField(2)
    email = messages.StringField(3)
    password = messages.StringField(4)
    nombre = messages.StringField(5)
    talla = messages.StringField(6)
    edad = messages.StringField(7)
    urlImage = messages.StringField(8)



class UserUpdate(messages.Message):
    token = messages.StringField(1)
    email = messages.StringField(2)
    password = messages.StringField(3)
    nombre = messages.StringField(4)
    talla = messages.StringField(5)
    edad = messages.StringField(6)
    urlImage = messages.StringField(7)
    entityKey = messages.StringField(8, required=True)

class UserList(messages.Message):
    code = messages.IntegerField(1)
    data = messages.MessageField(UserUpdate, 2, repeated=True)


######Empresa########

#Mensaje de Entrada y Salida para la base de datos Empresa
class EmpresaInput(messages.Message):
    token = messages.StringField(1, required=True)
    codigo_empresa = messages.StringField(2)
    nombre_empresa = messages.StringField(3)


class EmpresaUpdate(messages.Message):
    token = messages.StringField(1, required=True)
    entityKey = messages.StringField(2, required=True)
    codigo_empresa = messages.StringField(3)
    nombre_empresa = messages.StringField(4)



#regresa una lista para la base de datos Empresa
class EmpresaList(messages.Message):
    code = messages.IntegerField(1)
#regresa mensaje de lo ocurrido
#mensaje de tipo MENSAJEFIELD que regresa una lista de tipo EmpresaUpdate
#es necesario el repeated para que sea lista
    data = messages.MessageField(EmpresaUpdate, 2, repeated=True)


######Tweet########

#Mensaje de Entrada y Salida para Tweets
class TweetInput(messages.Message):
    token = messages.StringField(1, required=True)
    title = messages.StringField(2)
    description = messages.StringField(3)
    urlImage = messages.StringField(5)


class TweetUpdate(messages.Message):
    token = messages.StringField(1, required=True)
    #empresa_key = messages.StringField(2, required=True)
    entityKey = messages.StringField(2, required=True)
    title = messages.StringField(3)
    description = messages.StringField(4)
    urlImage = messages.StringField(5)

#regresa una lista para la base de datos Empresa
class TweetList(messages.Message):
    code = messages.IntegerField(1)
#regresa mensaje de lo ocurrido
#mensaje de tipo MENSAJEFIELD que regresa una lista de tipo TeamUpdate
#es necesario el repeated para que sea lista
    data = messages.MessageField(TweetUpdate, 2, repeated=True)


######Closets########

#Mensaje de Entrada y Salida para Tweets
class ClosetInput(messages.Message):
    token = messages.StringField(1, required=True)
    ubicacion = messages.StringField(2)
    cantidadPrendas = messages.StringField(3)

class ClosetUpdate(messages.Message):
    token = messages.StringField(1, required=True)
    #empresa_key = messages.StringField(2, required=True)
    entityKey = messages.StringField(2, required=True)
    ubicacion = messages.StringField(3)
    cantidadPrendas = messages.StringField(4)

#regresa una lista para la base de datos Empresa
class ClosetList(messages.Message):
    code = messages.IntegerField(1)
#regresa mensaje de lo ocurrido
#mensaje de tipo MENSAJEFIELD que regresa una lista de tipo TeamUpdate
#es necesario el repeated para que sea lista
    data = messages.MessageField(ClosetUpdate, 2, repeated=True)


######Prendas########

#Mensaje de Entrada y Salida para Tweets
class PrendaInput(messages.Message):
    token = messages.StringField(1, required=True)
    closet_key = messages.StringField(2)
    color = messages.StringField(3)
    talla = messages.StringField(4)
    tipoPrenda = messages.StringField(5)
    llaveCloset = messages.StringField(6)
    urlImage = messages.StringField(7)

class PrendaUpdate(messages.Message):
    token = messages.StringField(1, required=True)
    #empresa_key = messages.StringField(2, required=True)
    entityKey = messages.StringField(2, required=True)
    color = messages.StringField(3)
    talla = messages.StringField(4)
    tipoPrenda = messages.StringField(5)
    llaveCloset = messages.StringField(6)
    urlImage = messages.StringField(7)

#regresa una lista para la base de datos Empresa
class PrendaList(messages.Message):
    code = messages.IntegerField(1)
#regresa mensaje de lo ocurrido
#mensaje de tipo MENSAJEFIELD que regresa una lista de tipo TeamUpdate
#es necesario el repeated para que sea lista
    data = messages.MessageField(PrendaUpdate, 2, repeated=True)
