/*
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */
/*
 * This code was generated by https://github.com/google/apis-client-generator/
 * (build: 2017-11-07 19:12:12 UTC)
 * on 2017-11-15 at 19:30:10 UTC 
 * Modify at your own risk.
 */

package com.tweet_api.model;

/**
 * Model definition for MessagesTweetInput.
 *
 * <p> This is the Java data model class that specifies how to parse/serialize into the JSON that is
 * transmitted over HTTP when working with the tweet_api. For a detailed explanation see:
 * <a href="https://developers.google.com/api-client-library/java/google-http-java-client/json">https://developers.google.com/api-client-library/java/google-http-java-client/json</a>
 * </p>
 *
 * @author Google, Inc.
 */
@SuppressWarnings("javadoc")
public final class MessagesTweetInput extends com.google.api.client.json.GenericJson {

  /**
   * The value may be {@code null}.
   */
  @com.google.api.client.util.Key
  private java.lang.String cantidadPrendas;

  /**
   * The value may be {@code null}.
   */
  @com.google.api.client.util.Key
  private java.lang.String ubicacion;
  /**
   * The value may be {@code null}.
   */
  @com.google.api.client.util.Key
  private java.lang.String token;

  /**
   * The value may be {@code null}.
   */
  @com.google.api.client.util.Key
  private java.lang.String urlImage;

  /**
   * @return value or {@code null} for none
   */
  public java.lang.String getCantidad() {
    return cantidadPrendas;
  }

  /**
   * @param cantidadPrendas cantidad or {@code null} for none
   */
  public MessagesTweetInput setCantidad(java.lang.String cantidadPrendas) {
    this.cantidadPrendas = cantidadPrendas;
    return this;
  }

  /**
   * @return value or {@code null} for none
   */
  public java.lang.String getUbicacion() {
    return ubicacion;
  }

  /**
   * @param ubicacion title or {@code null} for none
   */
  public MessagesTweetInput setUbicacion(java.lang.String ubicacion) {
    this.ubicacion = ubicacion;
    return this;
  }

  /**
   * @return value or {@code null} for none
   */
  public java.lang.String getToken() {
    return token;
  }

  /**
   * @param token token or {@code null} for none
   */
  public MessagesTweetInput setToken(java.lang.String token) {
    this.token = token;
    return this;
  }

  /**
   * @return value or {@code null} for none
   */
  public java.lang.String getUrlImage() {
    return urlImage;
  }

  /**
   * @param urlImage urlImage or {@code null} for none
   */
  public MessagesTweetInput setUrlImage(java.lang.String urlImage) {
    this.urlImage = urlImage;
    return this;
  }

  @Override
  public MessagesTweetInput set(String fieldName, Object value) {
    return (MessagesTweetInput) super.set(fieldName, value);
  }

  @Override
  public MessagesTweetInput clone() {
    return (MessagesTweetInput) super.clone();
  }

}
