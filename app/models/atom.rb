class Atom
  attr_reader :bytes

  def initialize(bytes)
    @bytes = bytes
  end

  def type
    bytes.first(4).to_s
  end

  def size
    size_range & 0xFFFFFFF
  end

  def has_children?
    (size_range & 0x80000000) != 0
  end

  def children
    return [] unless has_children?

    current_atom = self
    size.times.map do
      current_atom = current_atom.next
    end
  end

  def data
    bytes.substring(8, size)
  end

  def next
    if has_children?
      Atom.new(bytes.substring(8))
    else
      Atom.new(bytes.substring(8 + size))
    end
  end

  private

  def size_range
    bytes.substring(4, 4).to_i
  end
end
