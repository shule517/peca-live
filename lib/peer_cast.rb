class PeerCast
  class << self
    def port_opened?(host, port_no, timeout_sec = 3)
      Timeout.timeout(timeout_sec, Timeout::Error) {
        sock = TCPSocket.open(host, port_no)
        pcp_hello_messsage = "pcp\x0a\x04\x00\x00\x00\x01\x00\x00\x00helo\x00\x00\x00\x80"
        sock.write(pcp_hello_messsage)
        response = sock.read
        result = response.start_with?("oleh")
        sock.close
        result
      }
    rescue Timeout::Error, StandardError
      false
    end
  end
end
