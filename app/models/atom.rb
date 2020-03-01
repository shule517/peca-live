class Atom
  attr_reader :bytes

  def initialize(bytes)
    @bytes = bytes
  end

  def type
    bytes.first(4).to_s
  end

  def has_children?
    byte = size_range.bytes.first
    (byte & 0b10000000) != 0
  end

  def children
    return [] unless has_children?

    current_atom = self
    size.times.map do
      current_atom = current_atom.next
    end
  end

  def size
    b_bytes = size_range.bytes

    byte1 = (b_bytes[0] & 0b0111) << 12
    byte2 = b_bytes[1] << 8
    byte3 = b_bytes[2] << 4
    byte4 = b_bytes[3]

    byte1 + byte2 + byte3 + byte4
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
    bytes.substring(4, 4).bytes.reverse.to_bytes
  end
end
