import React from "react";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';

interface Param {
  id: number;
  name: string;
  type?: string;
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

interface Color {}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  model: Model;
}

// Исходные данные 

const params: Param[] = [
  { id: 1, name: "Назначение" },
  { id: 2, name: "Длина" },
];

const model: Model = {
  colors: [],
  paramValues: [
    { paramId: 1, value: "повседневное" },
    { paramId: 2, value: "макси" },
  ],
};

class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.getModel = this.getModel.bind(this);
    this.setModel = this.setModel.bind(this);
    this.state = {model};
  }

  public getModel(e: React.FormEvent<HTMLFormElement>): Model {

    // Получаю данные нашей конечной модели непосредственно в консоли, а также предотвращаю действие браузера по уиолчанию

    e.preventDefault();
    console.log(this.state.model);
    return this.state.model;
  }

  public setModel(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState((prevState: State) => {

      // С помощью этой функции можно получить значения с изменённого инпута, путём нахождения его по имени, в котором хранится ключ id

      const model = prevState.model;
      // console.log(e.target)


      // Взял id с исходнных данных TextField атрибута name

      const propId: number = e.target.name as unknown as number;

      // Перечисления начинаются с нулевого значения

      model.paramValues[propId - 1].value = e.target.value;

      return { model };
    });
  };

  public alertFunction(): void {
    alert('Модель была получена в консоли!')
  }

  render() {
    return (
      <form 
        style={{ 
          width: "250px", 
          display: "flex", 
          flexDirection: "column" 
        }} 
        onSubmit={this.getModel}

        // Эта форма с помощью POST-запроса отправляет данные с инпутов на сервер, которые можно увидеть в нашей консоли
        
      >
        {params.map((item: { id: number; name: string }) => (
          <Box 
            key={item.id}
            sx={{
              display: "flex", 
              flexDirection: "row"
            }}
          >
            <InputLabel
              sx={{
                width: "150px",
                alignSelf: "center",
                fontWeight: 700,
                color: "#000",
              }}
            >
              {item.name}
            </InputLabel>
            <TextField
              InputProps={{
                style: {
                    fontWeight: 700
                }
              }}
              name={`${item.id}`}
              autoFocus={true}
              variant="outlined"
              value={this.state.model.paramValues[item.id - 1].value}
              onChange={this.setModel}
            />
          </Box>
        ))}
        <button
          style={{ 
            alignSelf: "center", 
            marginTop: "15px", 
            padding: "6px 20px", 
            border: "3px solid #008000", 
            borderRadius: "20px",
            textTransform: "uppercase",
            color: "#008000",
          }}
          onClick={this.alertFunction}
        >
          Получить модель
        </button>
      </form>
    );
  }
}

export default function App () {
  return <ParamEditor model={model} params={params} />;
};
