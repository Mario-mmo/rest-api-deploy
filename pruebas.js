const ACCEPTED_VALUES = [1, 2, 3, 4, 5, 6]

const contar = ({ acceptedValues = ACCEPTED_VALUES } = {}) => {
  console.log(acceptedValues)
}

contar()

contar(['ola', 'tete'])

const obj = {
  acceptedValues: ['outi', 'aaaa', 'cerdooo']
}

contar(obj)
