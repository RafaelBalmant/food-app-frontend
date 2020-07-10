import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Form, Input, Select, Button, Row, Col,
} from 'antd';
import axios from 'axios';
import { validateMessages } from '../../helpers/messages';
import { DefaultButton } from './styles';

const { Option } = Select;

export default function EstablishmentForm() {
  const state = useSelector((state) => state.location);

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then((response) => {
        const ufInitials = response?.data.map((uf) => uf.sigla);

        return dispatch({
          type: 'GET_UFS',
          ufs: ufInitials,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (!state.selectedUf) {
      return;
    }
    axios
      .get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state.selectedUf}/municipios`,
      )
      .then((response) => {
        const cityNames = response?.data.map((city) => city.nome);

        return dispatch({
          type: 'GET_CITIES',
          cities: cityNames,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [state.selectedUf]);

  const handleSelectUfCallback = useCallback((event) => {
    const uf = event;

    return dispatch({
      type: 'SET_UF',
      selectedUf: uf,
    });
  }, []);

  const handleSelectCityCallback = useCallback((event) => {
    const city = event;

    return dispatch({
      type: 'SET_CITY',
      selectedCity: city,
    });
  }, []);

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 10,
    },
  };

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Form.Item
        name={['establishment', 'name']}
        label="Nome"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Estado / Cidade"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.Group>
          <Form.Item
            name={['establishment', 'uf']}
            noStyle
          >
            <Select
              placeholder="Estado"
              style={{
                width: '30%',
                textAlign: 'center',
              }}
              name="uf"
              id="uf"
              value={state.selectedUf}
              onChange={handleSelectUfCallback}
            >
              {state.ufs.map((uf) => (
                <Option key={uf} value={uf}>
                  {uf}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name={['establishment', 'city']}
            noStyle
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Cidade"
              style={{
                width: '30%',
                textAlign: 'center',
              }}
              value={state.selectedCity}
              onChange={handleSelectCityCallback}
            >
              {state.cities.map((city) => (
                <Option key={city} value={city}>
                  {city}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Input.Group>
      </Form.Item>
      <Form.Item
        name={['establishment', 'address']}
        label="Endereço"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['establishment', 'number']}
        label="Numero"
        rules={[
          {
            required: true,
            min: 0,
            max: 99999,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['establishment', 'telephone']}
        label="Celular"
        rules={[
          {
            required: true,
            min: 0,
            max: 99999999999,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['establishment', 'whatsapp']}
        label="WhatsApp"
        rules={[
          {
            required: true,
            min: 0,
            max: 99999999999,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Row justify="end">
        <Col span={4}>
          <Form.Item>
            <DefaultButton htmlType="submit">
              Enviar
            </DefaultButton>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
