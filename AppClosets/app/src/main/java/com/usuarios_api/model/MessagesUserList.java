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
 * on 2017-11-08 at 19:27:26 UTC 
 * Modify at your own risk.
 */

package com.usuarios_api.model;

/**
 * Model definition for MessagesUserList.
 *
 * <p> This is the Java data model class that specifies how to parse/serialize into the JSON that is
 * transmitted over HTTP when working with the usuarios_api. For a detailed explanation see:
 * <a href="https://developers.google.com/api-client-library/java/google-http-java-client/json">https://developers.google.com/api-client-library/java/google-http-java-client/json</a>
 * </p>
 *
 * @author Google, Inc.
 */
@SuppressWarnings("javadoc")
public final class MessagesUserList extends com.google.api.client.json.GenericJson {

  /**
   * The value may be {@code null}.
   */
  @com.google.api.client.util.Key @com.google.api.client.json.JsonString
  private java.lang.Long code;

  /**
   * The value may be {@code null}.
   */
  @com.google.api.client.util.Key
  private java.util.List<MessagesUserUpdate> data;

  static {
    // hack to force ProGuard to consider MessagesUserUpdate used, since otherwise it would be stripped out
    // see https://github.com/google/google-api-java-client/issues/543
    com.google.api.client.util.Data.nullOf(MessagesUserUpdate.class);
  }

  /**
   * @return value or {@code null} for none
   */
  public java.lang.Long getCode() {
    return code;
  }

  /**
   * @param code code or {@code null} for none
   */
  public MessagesUserList setCode(java.lang.Long code) {
    this.code = code;
    return this;
  }

  /**
   * @return value or {@code null} for none
   */
  public java.util.List<MessagesUserUpdate> getData() {
    return data;
  }

  /**
   * @param data data or {@code null} for none
   */
  public MessagesUserList setData(java.util.List<MessagesUserUpdate> data) {
    this.data = data;
    return this;
  }

  @Override
  public MessagesUserList set(String fieldName, Object value) {
    return (MessagesUserList) super.set(fieldName, value);
  }

  @Override
  public MessagesUserList clone() {
    return (MessagesUserList) super.clone();
  }

}
