function resolveRiddle() {

  const container = document.querySelector('pre');
  var content = container.innerText;

  function isValidSequence(sequence) {
    const nums = sequence.split(' ').map(Number);

    const differences = nums.slice(1).map((num, i) => num - nums[i]);

    const allIncreasing = differences.every(diff => diff > 0 && diff <= 3);
    const allDecreasing = differences.every(diff => diff < 0 && diff >= -3);

    return allIncreasing || allDecreasing;
  }

  function canBeMadeValidByRemovingOne(sequence) {
    const nums = sequence.split(' ').map(Number);

    // Tester chaque niveau en le retirant
    for (let i = 0; i < nums.length; i++) {
      const testSequence = nums.filter((_, index) => index !== i);
      const differences = testSequence.slice(1).map((num, j) => num - testSequence[j]);
      const allIncreasing = differences.every(diff => diff > 0 && diff <= 3);
      const allDecreasing = differences.every(diff => diff < 0 && diff >= -3);

      if (allIncreasing || allDecreasing) {
        return true; // Si une suppression rend la séquence valide
      }
    }

    return false; // Aucune suppression ne rend la séquence valide
  }

  const filteredLines = content
    .trim()
    .split('\n')
    .filter(line => /^(\d+\s?)+$/.test(line))
    .map(line => ({
      sequence: line,
      isValid: isValidSequence(line),
      canBeFixed: false
    }));

  console.log(filteredLines);

  const validLines = filteredLines.filter(item => item.isValid)

  const validCount1 = validLines.length

  console.log(validCount1)

  // Marquer les rapports qui peuvent devenir valides
  filteredLines.forEach(item => {
    if (!item.isValid) {
      item.canBeFixed = canBeMadeValidByRemovingOne(item.sequence);
    }
  });

  const validCount2 = filteredLines.filter(item => item.isValid || item.canBeFixed).length;

  alert(` Nombre de séquences valides : ${validCount1}\n Nombre de séquences valides ou modifiables : ` + validCount2);
}