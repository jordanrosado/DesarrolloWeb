import endpoints
from google.appengine.ext import ndb
from google.appengine.api import app_identity
from protorpc import remote

import jwt
import time

from CustomExceptions import NotFoundException

from messages import EmailPasswordMessage, TokenMessage, CodeMessage, Token, TokenKey, TokenKeyCloset,MessageNone
from messages import EmpresaInput, EmpresaUpdate, EmpresaList
from messages import TweetInput, TweetUpdate, TweetList
from messages import UserInput, UserUpdate, UserList
from messages import ClosetInput, ClosetUpdate, ClosetList ##UserUpdate, UserList
from messages import PrendaInput, PrendaUpdate, PrendaList ##UserUpdate, UserList

from endpoints_proto_datastore.ndb import EndpointsModel

import models
from models import validarEmail
from models import Empresa, Usuarios, Tweet, Closet, Prenda

###############
# Products
###############
@endpoints.api(name='closets_api', version='v1', description='closets endpoints')
class ClosetsApi(remote.Service):
# insert
#                   ENTRADA    SALIDA        RUTA              siempre es POST     NOMBRE
 @endpoints.method(ClosetInput, CodeMessage, path='closet/insert', http_method='POST', name='closet.insert')
#siempre lleva cls y request
 def closet_add(cls, request):
  try:
   print request.ubicacion
   token = jwt.decode(request.token, 'secret')#CHECA EL TOKEN
   user = Usuarios.get_by_id(token['user_id']) #obtiene el usuario para poder acceder a los metodos declarados en models.py en la seccion de
   mycloset = Closet()
   if mycloset.closet_m(request, user.key)==0:#llama a la funcion declarada en models.py en la seccion de USUARIOS
    codigo=1
   else:
    codigo=-3
          #la funcion josue_m puede actualizar e insertar
          #depende de la ENTRADA de este endpoint method
   message = CodeMessage(code=codigo, message='Closet added')
  except jwt.DecodeError:
   message = CodeMessage(code=-2, message='Invalid token')
  except jwt.ExpiredSignatureError:
   message = CodeMessage(code=-1, message='Token expired')
  print message
  return message

# update
#                   ENTRADA    SALIDA        RUTA              siempre es POST     NOMBRE
 @endpoints.method(ClosetUpdate, CodeMessage, path='closet/update', http_method='POST', name='closet.update')
#siempre lleva cls y request
 def closet_update(cls, request):
  try:
   token = jwt.decode(request.token, 'secret')#CHECA EL TOKEN
   user = Usuarios.get_by_id(token['user_id']) #obtiene el usuario para poder acceder a los metodos declarados en models.py en la seccion de
   mycloset = Closet()
   if mycloset.closet_m(request, user.key)==0:#llama a la funcion declarada en models.py en la seccion de USUARIOS
    codigo=1
   else:
    codigo=-3
      #la funcion josue_m puede actualizar e insertar
      #depende de la ENTRADA de este endpoint method
   message = CodeMessage(code=1, message='Prenda updated')
  except jwt.DecodeError:
   message = CodeMessage(code=-2, message='Invalid token')
  except jwt.ExpiredSignatureError:
   message = CodeMessage(code=-1, message='Token expired')
  return message

# list
#                   ENTRADA    SALIDA        RUTA              siempre es POST     NOMBRE
 @endpoints.method(Token, ClosetList, path='closet/list', http_method='POST', name='closet.list')
#siempre lleva cls y request
 def closet_list(cls, request):
  try:
   token = jwt.decode(request.tokenint, 'secret')#CHECA EL TOKEN
   user = Usuarios.get_by_id(token['user_id']) #obtiene usuario dado el token
   lista = [] #crea lista para guardar contenido de la BD
   lstMessage = ClosetList(code=1) #CREA el mensaje de salida
   lstBd = Closet.query().fetch() #obtiene de la base de datos
   for i in lstBd: #recorre la base de datos
    #inserta a la lista creada con los elementos que se necesiten de la base de datos
    #i.empresa_key.urlsafe() obtiene el entityKey

    lista.append(ClosetUpdate(token='',
     entityKey=i.entityKey,
     #empresa_key=i.empresa_key.urlsafe(),
     ubicacion=i.ubicacion,
     cantidadPrendas=i.cantidadPrendas))
   lstMessage.data = lista #ASIGNA a la salida la lista
   message = lstMessage
  except jwt.DecodeError:
   message = ClosetList(code=-1, data=[])
  except jwt.ExpiredSignatureError:
   message = ClosetList(code=-2, data=[])
  return message

###############get the info of one########
 @endpoints.method(TokenKey, ClosetList, path='closet/get', http_method='POST', name='closet.get')
 def closet_get(cls, request):
  try:
   print request.entityKey
   token = jwt.decode(request.tokenint, 'secret')  #checa token
   closetentity = ndb.Key(urlsafe=request.entityKey)
   closet = Closet.get_by_id(closetentity.id()) #obtiene usuario
            #user = Usuarios.get_by_id(token['user_id']) #obtiene usuario dado el token
   lista = []  #crea lista
   lstMessage = ClosetList(code=1) # crea objeto mensaje
   lista.append(ClosetUpdate(token='',
    entityKey= closet.entityKey,
    #empresa_key = user.empresa_key.urlsafe(),
    ubicacion=closet.ubicacion,
    cantidadPrendas=closet.cantidadPrendas))
   lstMessage.data = lista#ASIGNA a la salida la lista
   message = lstMessage
  except jwt.DecodeError:
   message = ClosetList(code=-1, data=[]) #token invalido
  except jwt.ExpiredSignatureError:
   message = ClosetList(code=-2, data=[]) #token expiro
  return message

# delete
#                   ENTRADA    SALIDA        RUTA              siempre es POST     NOMBRE
 @endpoints.method(TokenKey, CodeMessage, path='closet/delete', http_method='POST', name='closet.delete')
 #siempre lleva cls y request
 def closet_remove(cls, request):
  try:
   token = jwt.decode(request.tokenint, 'secret')#CHECA EL TOKEN
   closetentity = ndb.Key(urlsafe=request.entityKey)#Obtiene el elemento dado el EntitKey
   closetentity.delete()#BORRA
   message = CodeMessage(code=1, message='Succesfully deleted')
  except jwt.DecodeError:
   message = CodeMessage(code=-2, message='Invalid token')
  except jwt.ExpiredSignatureError:
   message = CodeMessage(code=-1, message='Token expired')
  return message

###############
# Prendas
###############
@endpoints.api(name='prendas_api', version='v1', description='prendas endpoints')
class PrendasApi(remote.Service):
# insert
#                   ENTRADA    SALIDA        RUTA              siempre es POST     NOMBRE
 @endpoints.method(PrendaInput, CodeMessage, path='prendas/insert', http_method='POST', name='prendas.insert')
#siempre lleva cls y request
 def prenda_add(cls, request):
  try:
   token = jwt.decode(request.token, 'secret')#CHECA EL TOKEN
   closetentity = ndb.Key(urlsafe=request.closet_key)
   closet = Closet.get_by_id(closetentity.id()) #obtiene usuario
   #closet = Closet.get_by_id(token['user_id']) #obtiene el usuario para poder acceder a los metodos declarados en models.py en la seccion de
   myprenda = Prenda()
   if myprenda.prenda_m(request, closet.key)==0:#llama a la funcion declarada en models.py en la seccion de USUARIOS
    codigo=1
   else:
    codigo=-3
          #la funcion josue_m puede actualizar e insertar
          #depende de la ENTRADA de este endpoint method
   message = CodeMessage(code=codigo, message='Prenda added')
  except jwt.DecodeError:
   message = CodeMessage(code=-2, message='Invalid token')
  except jwt.ExpiredSignatureError:
   message = CodeMessage(code=-1, message='Token expired')
  print message
  return message

# list
#                   ENTRADA    SALIDA        RUTA              siempre es POST     NOMBRE
 @endpoints.method(TokenKeyCloset, PrendaList, path='prendas/list', http_method='POST', name='prendas.list')
#siempre lleva cls y request
 def prenda_list(cls, request):
  try:
   token = jwt.decode(request.tokenint, 'secret')#CHECA EL TOKEN
   closetentity = ndb.Key(urlsafe=request.closet_key)
   closet = Closet.get_by_id(closetentity.id()) #obtiene usuario
   lista = [] #crea lista para guardar contenido de la BD
   lstMessage = PrendaList(code=1) #CREA el mensaje de salida
   lstBd = Prenda.query(Prenda.llaveCloset == request.closet_key).fetch() #obtiene de la base de datos
   for i in lstBd: #recorre la base de datos
    #inserta a la lista creada con los elementos que se necesiten de la base de datos
    #i.empresa_key.urlsafe() obtiene el entityKey

    lista.append(PrendaUpdate(token='',
     entityKey=i.entityKey,
     #empresa_key=i.empresa_key.urlsafe(),
     color=i.color,
     talla=i.talla,
     tipoPrenda=i.tipoPrenda,
     urlImage=i.urlImage))
   lstMessage.data = lista #ASIGNA a la salida la lista
   message = lstMessage
  except jwt.DecodeError:
   message = PrendaList(code=-1, data=[])
  except jwt.ExpiredSignatureError:
   message = PrendaList(code=-2, data=[])
  return message

# delete
#                   ENTRADA    SALIDA        RUTA              siempre es POST     NOMBRE
 @endpoints.method(TokenKey, CodeMessage, path='prendas/delete', http_method='POST', name='prendas.delete')
 #siempre lleva cls y request
 def prenda_remove(cls, request):
  try:
   token = jwt.decode(request.tokenint, 'secret')#CHECA EL TOKEN
   prendaentity = ndb.Key(urlsafe=request.entityKey)#Obtiene el elemento dado el EntitKey
   prendaentity.delete()#BORRA
   message = CodeMessage(code=1, message='Succesfully deleted')
  except jwt.DecodeError:
   message = CodeMessage(code=-2, message='Invalid token')
  except jwt.ExpiredSignatureError:
   message = CodeMessage(code=-1, message='Token expired')
  return message

###############get the info of one########
 @endpoints.method(TokenKey, PrendaList, path='prendas/get', http_method='POST', name='prendas.get')
 def prenda_get(cls, request):
  try:
   token = jwt.decode(request.tokenint, 'secret')  #checa token
   prendaentity = ndb.Key(urlsafe=request.entityKey)
   prenda = Prenda.get_by_id(prendaentity.id()) #obtiene usuario
            #user = Usuarios.get_by_id(token['user_id']) #obtiene usuario dado el token
   lista = []  #crea lista
   lstMessage = PrendaList(code=1) # crea objeto mensaje
   lista.append(PrendaUpdate(token='',
    entityKey= prenda.entityKey,
    #empresa_key = user.empresa_key.urlsafe(),
    color=prenda.color,
    talla=prenda.talla,
    tipoPrenda=prenda.tipoPrenda,
    llaveCloset=prenda.llaveCloset,
    urlImage=prenda.urlImage))
   lstMessage.data = lista#ASIGNA a la salida la lista
   message = lstMessage
  except jwt.DecodeError:
   message = PrendaList(code=-1, data=[]) #token invalido
  except jwt.ExpiredSignatureError:
   message = PrendaList(code=-2, data=[]) #token expiro
  print message
  return message

# update
#                   ENTRADA    SALIDA        RUTA              siempre es POST     NOMBRE
 @endpoints.method(PrendaUpdate, CodeMessage, path='prendas/update', http_method='POST', name='prendas.update')
#siempre lleva cls y request
 def prenda_update(cls, request):
  try:
   token = jwt.decode(request.token, 'secret')#CHECA EL TOKEN
   closetentity = ndb.Key(urlsafe=request.llaveCloset)
   closet = Closet.get_by_id(closetentity.id()) #obtiene usuario
   myprenda = Prenda()
   if myprenda.prenda_m(request, closet.key)==0:#llama a la funcion declarada en models.py en la seccion de USUARIOS
    codigo=1
   else:
    codigo=-3
      #la funcion josue_m puede actualizar e insertar
      #depende de la ENTRADA de este endpoint method
   message = CodeMessage(code=1, message='Prenda updated')
  except jwt.DecodeError:
   message = CodeMessage(code=-2, message='Invalid token')
  except jwt.ExpiredSignatureError:
   message = CodeMessage(code=-1, message='Token expired')
  return message

###############
# Usuarios
###############
@endpoints.api(name='usuarios_api', version='v1', description='usuarios endpoints')
class UsuariosApi(remote.Service):
###############get the info of one########
 @endpoints.method(TokenKey, UserList, path='users/get', http_method='POST', name='users.get')
 def users_get(cls, request):
  try:
   token = jwt.decode(request.tokenint, 'secret')  #checa token
   userentity = ndb.Key(urlsafe=request.entityKey)
   user = Usuarios.get_by_id(userentity.id()) #obtiene usuario
            #user = Usuarios.get_by_id(token['user_id']) #obtiene usuario dado el token
   lista = []  #crea lista
   lstMessage = UserList(code=1) # crea objeto mensaje
   lista.append(UserUpdate(token='',
    entityKey= user.entityKey,
    #empresa_key = user.empresa_key.urlsafe(),
    email = user.email,
    nombre = user.nombre,
    talla = user.talla,
    edad = user.edad,
    urlImage = user.urlImage))
   lstMessage.data = lista#ASIGNA a la salida la lista
   message = lstMessage
  except jwt.DecodeError:
   message = UserList(code=-1, data=[]) #token invalido
  except jwt.ExpiredSignatureError:
   message = UserList(code=-2, data=[]) #token expiro
  return message


########################## list###################
#                   ENTRADA    SALIDA        RUTA              siempre es POST     NOMBRE
 @endpoints.method(Token, UserList, path='users/list', http_method='POST', name='users.list')
 def lista_usuarios(cls, request):
  try:
   token = jwt.decode(request.tokenint, 'secret')  #checa token
   user = Usuarios.get_by_id(token['user_id']) #obtiene usuario dado el token
   lista = []  #crea lista
   lstMessage = UserList(code=1) # crea objeto mensaje
   lstBd = Usuarios.query().fetch() # recupera de base de datos
   for i in lstBd: # recorre
    lista.append(UserUpdate(token='',
     entityKey=i.entityKey,
     #empresa_key=user.empresa_key.urlsafe(),
     email=i.email)) # agrega a la lista

   lstMessage.data = lista # la manda al messa
   message = lstMessage #regresa

  except jwt.DecodeError:
   message = UserList(code=-1, data=[]) #token invalido
  except jwt.ExpiredSignatureError:
   message = UserList(code=-2, data=[]) #token expiro
  return message

# delete
#                   ENTRADA    SALIDA        RUTA              siempre es POST     NOMBRE
 @endpoints.method(TokenKey, CodeMessage, path='users/delete', http_method='POST', name='users.delete')
 #siempre lleva cls y request
 def user_remove(cls, request):
  try:
   token = jwt.decode(request.tokenint, 'secret')#CHECA EL TOKEN
   usersentity = ndb.Key(urlsafe=request.entityKey)#Obtiene el elemento dado el EntitKey
   usersentity.delete()#BORRA
   message = CodeMessage(code=1, message='Succesfully deleted')
  except jwt.DecodeError:
   message = CodeMessage(code=-2, message='Invalid token')
  except jwt.ExpiredSignatureError:
   message = CodeMessage(code=-1, message='Token expired')
  return message

# insert
#                   ENTRADA    SALIDA        RUTA              siempre es POST     NOMBRE
 @endpoints.method(UserInput, CodeMessage, path='users/insert', http_method='POST', name='users.insert')
 def user_add(cls, request):
  try:
   token = jwt.decode(request.token, 'secret')#CHECA EL TOKEN
   user = Usuarios.get_by_id(token['user_id'])
   if validarEmail(request.email) == False: #checa si el email esta registrado
                       #empresakey = ndb.Key(urlsafe=request.empresa_key) #convierte el string dado a entityKey
    if user.usuario_m(request, user.empresa_key)==0:#llama a la funcion declarada en models.py en la seccion de USUARIOS
     codigo=1
    else:
     codigo=-3
                       #la funcion josue_m puede actualizar e insertar
                       #depende de la ENTRADA de este endpoint method
    message = CodeMessage(code=codigo, message='Succesfully added')
   else:
    message = CodeMessage(code=-4, message='El email ya ha sido registrado')
  except jwt.DecodeError:
   message = CodeMessage(code=-2, message='Invalid token')
  except jwt.ExpiredSignatureError:
   message = CodeMessage(code=-1, message='Token expired')
  print message
  return message


##login##

 @endpoints.method(EmailPasswordMessage, TokenMessage, path='users/login', http_method='POST', name='users.login')
 def users_login(cls, request):
  try:
   user = Usuarios.query(Usuarios.email == request.email).fetch() #obtiene el usuario dado el email
   if not user or len(user) == 0: #si no encuentra user saca
    raise NotFoundException()
   user = user[0]
   keye = user.empresa_key.urlsafe() # regresa como mensaje el empresa key
   if not user.verify_password(request.password): # checa la contrasena
    raise NotFoundException()

   token = jwt.encode({'user_id': user.key.id(), 'exp': time.time() + 600}, 'secret') #crea el token
   message = TokenMessage(token=token, message=keye, code=1, entityKey=user.entityKey) # regresa token
  except NotFoundException:
   message = TokenMessage(token=None, message='Wrong username or password', code=-1, entityKey=None)
  return message

##update##
# update
#                   ENTRADA    SALIDA        RUTA              siempre es POST     NOMBRE
 @endpoints.method(UserUpdate, CodeMessage, path='user/update', http_method='POST', name='user.update')
#siempre lleva cls y request
 def user_update(cls, request):
  try:
   print request.token
   token = jwt.decode(request.token, 'secret')#CHECA EL TOKEN
   user = Usuarios.get_by_id(token['user_id'])#obtiene el usuario para poder acceder a los metodos declarados en models.py en la seccion de USUARIOS
   empresakey = ndb.Key(urlsafe=user.empresa_key.urlsafe())#convierte el string dado a entityKey
   if user.usuario_m(request, empresakey)==0:#llama a la funcion declarada en models.py en la seccion de USUARIOS
    codigo=1
   else:
    codigo=-3
      #la funcion josue_m puede actualizar e insertar
      #depende de la ENTRADA de este endpoint method
   message = CodeMessage(code=1, message='Sus cambios han sido guardados exitosamente')
  except jwt.DecodeError:
   message = CodeMessage(code=-2, message='Invalid token')
  except jwt.ExpiredSignatureError:
   message = CodeMessage(code=-1, message='Token expired')
  print message
  return message


'''
'''

###########################
#### Empresa
###########################


## Google Cloud Endpoint
@endpoints.api(name='empresas_api', version='v1', description='empresas REST API')
class EmpresasApi(remote.Service):


# get one

 @endpoints.method(TokenKey, EmpresaList, path='empresa/get', http_method='POST', name='empresa.get')
#siempre lleva cls y request
 def empresa_get(cls, request):
  try:
   token = jwt.decode(request.tokenint, 'secret')#CHECA EL TOKEN
      #Obtiene el elemento dado el entityKey
   empresaentity = ndb.Key(urlsafe=request.entityKey)
      #CREA LA SALIDA de tipo JosueInput y le asigna los valores, es a como se declaro en el messages.py
      #empresaentity.get().empresa_key.urlsafe() para poder optener el EntityKey
     ##### ejemplo real
    ####### message = EmpresaList(code=1, data=[EmpresaUpdate(token='Succesfully get', nombre_empresa=empresaentity.get().nombre_empresa, empresa_key=empresaentity.get().empresa_key.urlsafe(), entityKey=empresaentity.get().entityKey)])
   message = EmpresaList(code=1, data = [EmpresaUpdate(token='Succesfully get',
    entityKey = empresaentity.get().entityKey,
    codigo_empresa=empresaentity.get().codigo_empresa,
    nombre_empresa = empresaentity.get().nombre_empresa)])

  except jwt.DecodeError:
   message = EmpresaList(code=-1, data=[])
  except jwt.ExpiredSignatureError:
   message = EmpresaList(code=-2, data=[])
  return message




 @endpoints.method(TokenKey, CodeMessage, path='empresa/delete', http_method='POST', name='empresa.delete')
#siempre lleva cls y request
 def empresa_remove(cls, request):
  try:
   token = jwt.decode(request.tokenint, 'secret')#CHECA EL TOKEN
   empresaentity = ndb.Key(urlsafe=request.entityKey)#Obtiene el elemento dado el EntitKey
   empresaentity.delete()#BORRA
   message = CodeMessage(code=1, message='Succesfully deleted')
  except jwt.DecodeError:
   message = CodeMessage(code=-2, message='Invalid token')
  except jwt.ExpiredSignatureError:
   message = CodeMessage(code=-1, message='Token expired')
  return message


# insert
 @endpoints.method(EmpresaInput, CodeMessage, path='empresa/insert', http_method='POST', name='empresa.insert')
#siempre lleva cls y request
 def empresa_add(cls, request):
  try:
   token = jwt.decode(request.token, 'secret')#CHECA EL TOKEN
   user = Usuarios.get_by_id(token['user_id'])#obtiene el usuario models.py
   myempresa = Empresa()
   if myempresa.empresa_m(request)==0:
    codigo=1
   else:
		codigo=-3
      	      #la funcion josue_m puede actualizar e insertar
	      #depende de la ENTRADA de este endpoint method
   message = CodeMessage(code=codigo, message='Succesfully added')
      #else:
	    #  message = CodeMessage(code=-4, message='Succesfully added')
  except jwt.DecodeError:
   message = CodeMessage(code=-2, message='Invalid token')
  except jwt.ExpiredSignatureError:
   message = CodeMessage(code=-1, message='Token expired')
  return message



# update
#                   ENTRADA    SALIDA        RUTA              siempre es POST     NOMBRE
 @endpoints.method(EmpresaUpdate, CodeMessage, path='empresa/update', http_method='POST', name='empresa.update')
#siempre lleva cls y request
 def empresa_update(cls, request):
  try:
   token = jwt.decode(request.token, 'secret')#CHECA EL TOKEN
   user = Usuarios.get_by_id(token['user_id'])#obtiene el usuario para poder acceder a los metodos declarados en models.py en la seccion de USUARIOS
      #empresakey = ndb.Key(urlsafe=request.empresa_key)#convierte el string dado a entityKey
   myempresa = Empresa()
   if myempresa.empresa_m(request)==0:#llama a la funcion declarada en models.py en la seccion de USUARIOS
    codigo=1
   else:
    codigo=-3
      #la funcion josue_m puede actualizar e insertar
      #depende de la ENTRADA de este endpoint method
   message = CodeMessage(code=1, message='Sus cambios han sido guardados exitosamente')
  except jwt.DecodeError:
   message = CodeMessage(code=-2, message='Invalid token')
  except jwt.ExpiredSignatureError:
   message = CodeMessage(code=-1, message='Token expired')
  return message



# list
#                   ENTRADA    SALIDA        RUTA              siempre es POST     NOMBRE
 @endpoints.method(Token, EmpresaList, path='empresa/list', http_method='POST', name='empresa.list')
#siempre lleva cls y request
 def empresa_list(cls, request):
  try:
   token = jwt.decode(request.tokenint, 'secret')#CHECA EL TOKEN
   user = Usuarios.get_by_id(token['user_id']) #obtiene usuario dado el token
   #if user.importante==1 or user.importante==2:
   lista = [] #crea lista para guardar contenido de la BD
   lstMessage = EmpresaList(code=1) #CREA el mensaje de salida
   lstBdEmpresa = Empresa.query().fetch() #obtiene de la base de datos
   for i in lstBdEmpresa: #recorre la base de datos
             #inserta a la lista creada con los elementos que se necesiten de la base de datos
             #i.empresa_key.urlsafe() obtiene el entityKey
	     #lista.append(ClientesUpdate(token='', nombre=i.nombre, status=i.status, empresa_key=i.empresa_key.urlsafe(), entityKey=i.entityKey))
    lista.append(EmpresaUpdate(token='',
     entityKey = i.entityKey,
     codigo_empresa=i.codigo_empresa,
     nombre_empresa = i.nombre_empresa))

   lstMessage.data = lista #ASIGNA a la salida la lista
   message = lstMessage
      #else:
      #    message = EmpresaList(code=-3, data=[])
  except jwt.DecodeError:
   message = EmpresaList(code=-1, data=[])
  except jwt.ExpiredSignatureError:
   message = EmpresaList(code=-2, data=[])
  return message


###########################
#### Tweets
###########################

@endpoints.api(name='tweet_api', version='v1', description='tweet REST API')
class TweetApi(remote.Service):
# get one
#                   ENTRADA    SALIDA        RUTA              siempre es POST     NOMBRE
 @endpoints.method(TokenKey, TweetList, path='tweet/get', http_method='POST', name='tweet.get')
#siempre lleva cls y request
 def tweet_get(cls, request):
  try:
   token = jwt.decode(request.tokenint, 'secret')#CHECA EL TOKEN
      #Obtiene el elemento dado el entityKey
   tweetentity = ndb.Key(urlsafe=request.entityKey)
      #CREA LA SALIDA de tipo JosueInput y le asigna los valores, es a como se declaro en el messages.py
      #josuentity.get().empresa_key.urlsafe() para poder optener el EntityKey
   message = TweetList(code=1, data=[TweetUpdate(token='Succesfully get',
    entityKey=tweetentity.get().entityKey,
    #empresa_key=teamentity.get().empresa_key.urlsafe(),
    title=tweetentity.get().title,
    description=tweetentity.get().description,
    urlImage=tweetentity.get().urlImage)])
  except jwt.DecodeError:
   message = TweetList(code=-1, data=[])
  except jwt.ExpiredSignatureError:
   message = TweetList(code=-2, data=[])
  return message


# delete
#                   ENTRADA    SALIDA        RUTA              siempre es POST     NOMBRE
 @endpoints.method(TokenKey, CodeMessage, path='tweet/delete', http_method='POST', name='tweet.delete')
#siempre lleva cls y request
 def tweet_remove(cls, request):
  try:
   token = jwt.decode(request.tokenint, 'secret')#CHECA EL TOKEN
   tweetentity = ndb.Key(urlsafe=request.entityKey)#Obtiene el elemento dado el EntitKey
   tweetentity.delete()#BORRA
   message = CodeMessage(code=0, message='tweet deleted')
  except jwt.DecodeError:
   message = CodeMessage(code=-2, message='Invalid token')
  except jwt.ExpiredSignatureError:
   message = CodeMessage(code=-1, message='Token expired')
  return message

# list
#                   ENTRADA    SALIDA        RUTA              siempre es POST     NOMBRE
 @endpoints.method(Token, TweetList, path='tweet/list', http_method='POST', name='tweet.list')
#siempre lleva cls y request
 def tweet_list(cls, request):
  try:
   token = jwt.decode(request.tokenint, 'secret')#CHECA EL TOKEN
   user = Usuarios.get_by_id(token['user_id']) #obtiene usuario dado el token
   lista = [] #crea lista para guardar contenido de la BD
   lstMessage = TweetList(code=1) #CREA el mensaje de salida
   lstBd = Tweet.query().fetch() #obtiene de la base de datos
   for i in lstBd: #recorre la base de datos
    #inserta a la lista creada con los elementos que se necesiten de la base de datos
    #i.empresa_key.urlsafe() obtiene el entityKey

    lista.append(TweetUpdate(token='',
     entityKey=i.entityKey,
     #empresa_key=i.empresa_key.urlsafe(),
     title=i.title,
     decription=i.decription,
     urlImage=i.urlImage))
   lstMessage.data = lista #ASIGNA a la salida la lista
   message = lstMessage
  except jwt.DecodeError:
   message = TweetList(code=-1, data=[])
  except jwt.ExpiredSignatureError:
   message = TweetList(code=-2, data=[])
  return message

# insert
#                   ENTRADA    SALIDA        RUTA              siempre es POST     NOMBRE
 @endpoints.method(TweetInput, CodeMessage, path='tweet/insert', http_method='POST', name='tweet.insert')
#siempre lleva cls y request
 def tweet_add(cls, request):
  try:
   token = jwt.decode(request.token, 'secret')#CHECA EL TOKEN
   user = Usuarios.get_by_id(token['user_id']) #obtiene el usuario para poder acceder a los metodos declarados en models.py en la seccion de
   mytweet = Tweet()
   if mytweet.tweet_m(request, user.empresa_key)==0:#llama a la funcion declarada en models.py en la seccion de USUARIOS
    codigo=1
   else:
    codigo=-3
          #la funcion josue_m puede actualizar e insertar
          #depende de la ENTRADA de este endpoint method
   message = CodeMessage(code=codigo, message='Tweet added')
  except jwt.DecodeError:
   message = CodeMessage(code=-2, message='Invalid token')
  except jwt.ExpiredSignatureError:
   message = CodeMessage(code=-1, message='Token expired')
  return message

# update
#                   ENTRADA    SALIDA        RUTA              siempre es POST     NOMBRE
 @endpoints.method(TweetUpdate, CodeMessage, path='tweet/update', http_method='POST', name='tweet.update')
#siempre lleva cls y request
 def tweet_update(cls, request):
  try:
   token = jwt.decode(request.token, 'secret')#CHECA EL TOKEN
   user = Usuarios.get_by_id(token['user_id'])#obtiene el usuario para poder acceder a los metodos declarados en models.py en la seccion de USUARIOS
   empresakey = ndb.Key(urlsafe=user.empresa_key.urlsafe())#convierte el string dado a entityKey
   mytweet = Tweet()
   if mytweet.tweet_m(request, empresakey)==0:#llama a la funcion declarada en models.py en la seccion de USUARIOS
    codigo=1
   else:
    codigo=-3
      #la funcion josue_m puede actualizar e insertar
      #depende de la ENTRADA de este endpoint method
   message = CodeMessage(code=1, message='tweet updated')
  except jwt.DecodeError:
   message = CodeMessage(code=-2, message='Invalid token')
  except jwt.ExpiredSignatureError:
   message = CodeMessage(code=-1, message='Token expired')
  return message


application = endpoints.api_server([UsuariosApi, EmpresasApi, TweetApi, ClosetsApi, PrendasApi], restricted=False)
